export interface Session {
  errorRate?: number,
  sessionId: string,
}

const UPDATE_SESSION = 'UPDATE_SESSION';
const DELETE_SESSION = 'DELETE_SESSION';

interface UpdateSessionAction {
  type: typeof UPDATE_SESSION,
  payload: Session,
};

interface DeleteSessionAction {
  type: typeof DELETE_SESSION,
  payload: Session
};

export type SessionActionTypes = UpdateSessionAction | DeleteSessionAction;