import { RemoteMongoClient } from "mongodb-stitch-browser-sdk";
import { client } from "../index";

const db = client
  .getServiceClient(RemoteMongoClient.factory, "mongodb-atlas")
  .db("correla");

export const peopleCollection = db.collection("people");

export const usernameCollection = db.collection("usernames");

export const auth = client.auth;
