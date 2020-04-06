import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import {Board, Task} from './board.model';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';
import {switchMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFirestore,
    ) { }

  /**
   * Create a new board with default task
   * @param data: Board data for new board
   */
  async createBoard(data: Board) {
    const user = await this.afAuth.currentUser;
    return this.db.collection('boards').add({
      ...data,
      uid: user.uid,
      tasks: [{description: 'Hello!', label: 'yellow'}]
    });
  }

  /**
   * Delete a board
   * @param boardId: string ID
   */
  deleteBoard(boardId: string) {
    return this.db.collection('boards').doc(boardId).delete();
  }

  /**
   * Update a board
   * @param boardId: string
   * @param tasks: Tasks[]
   */
  updateTasks(boardId: string, tasks: Task[]) {
    return this.db.collection('boards').doc(boardId).update({ tasks });
  }

  /**
   * Remove a specific task from a board
   * @param boardId: string
   * @param task: Task - task to remove from the board
   */
  removeTask(boardId: string, task: Task) {
    return this.db.collection('boards').doc(boardId).update({ tasks: firebase.firestore.FieldValue.arrayRemove(task)})
  }

  /**
   * Get the current users boards
   */
  getUserBoards() {
    return this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.db
            .collection<Board>('boards', ref =>
            ref.where('uid', '==', user.uid)
              .orderBy('priority'))
            .valueChanges({idField: 'id'});
        } else {
          return [];
        }
      })
    );
  }

  /**
   * Sort boards in database by order in array
   * Updates priority value of each board
   * @param boards: Board[]
   */
  sortBoards(boards: Board[]) {
    const db = firebase.firestore();
    const batch = db.batch();
    const refs = boards.map(b => db.collection('boards').doc(b.id));
    refs.forEach((ref, idx) => batch.update(ref, {priority: idx}));
    batch.commit();
  }
}
