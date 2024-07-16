import { initializeApp, cert, App } from "firebase-admin/app";
import { getAuth, Auth } from "firebase-admin/auth";
import dotenv from "dotenv";

export class Firebase {
  private project_id: string;
  private client_email: string;
  private private_key: string;
  private App: App;
  private auth: Auth;
  constructor() {
    dotenv.config();
    this.project_id = process.env.FIREBASE_PROJECT_ID;
    this.client_email = process.env.FIREBASE_CLIENT_EMAIL;
    this.private_key = process.env.FIREBASE_PRIVATE_KEY.replaceAll("\\n", "\n");
    this.onCreate();
  }

  onCreate() {
    if (this.project_id == null || this.client_email == null || this.private_key == null) {
      throw Error("Environment variable is missing");
    }
    this.App = initializeApp({
      credential: cert({
        projectId: this.project_id,
        privateKey: this.private_key,
        clientEmail: this.client_email,
      }),
    });
    this.auth = getAuth(this.App);
  }

  getProjectId() {
    return this.project_id;
  }

  getAuth() {
    return this.auth;
  }

  getApp() {
    return this.App;
  }
}
