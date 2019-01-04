import React from "react";
import {
  Stitch,
  RemoteMongoClient,
  GoogleRedirectCredential,
  FacebookRedirectCredential
} from "mongodb-stitch-browser-sdk";
import Layout from "../../components/Layout";
import Loader from "../../components/Loader";
import GoogleIcon from "../../components/GoogleIcon";
import FacebookIcon from "../../components/FacebookIcon";
import AccountPage from "./Account";
import "./Account.css";

const getName = (name, fname, lname) => {
  if (name && name.length) {
    return name;
  } else if ((fname && fname.length) || (lname && lname.length)) {
    let fullName = "";
    if (fname && fname.length) {
      fullName = fname;
    }
    if (lname && lname.length) {
      if (fullName.length) {
        fullName += " " + lname;
      } else {
        fullName = lname;
      }
    }
    return fullName;
  }
  return "";
};

export default class Account extends React.Component {
  constructor(props) {
    super(props);
    this.client = Stitch.defaultAppClient;
    this.db = this.client
      .getServiceClient(RemoteMongoClient.factory, "mongodb-atlas")
      .db("correla");
    this.people = this.db.collection("people");
    this.state = {
      person: false
    };
  }

  componentDidMount() {
    if (this.client.auth.isLoggedIn) {
      if (this.client.auth.user.loggedInProviderType === "anon-user") {
        this.signOut();
      } else {
        this.getAccount();
      }
    }
    if (this.client.auth.hasRedirectResult()) {
      this.client.auth
        .handleRedirectResult()
        .then(result => {
          console.log(result);
          this.getAccount();
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  getAccount = () => {
    this.people
      .find(
        {
          uid: this.client.auth.user.id
        },
        {
          limit: 1
        }
      )
      .first()
      .then(person => {
        if (person) {
          this.setState({ person });
        } else {
          this.createPerson();
        }
      });
  };

  createPerson = () => {
    const uid = this.client.auth.user.id;
    const p = this.client.auth.user.profile;
    const name = getName(p.name, p.firstName, p.lastName);
    this.people
      .insertOne({
        uid,
        name,
        nameSearch: name.length ? name.toUpperCase().split(" ") : [],
        username: name.length
          ? `${name.toLowerCase().replace(/ /g, "-")}-${uid}`
          : uid,
        birthday:
          p.birthday && p.birthday.length
            ? new Date(p.birthday).getTime()
            : null,
        _birthday: p.birthday && p.birthday.length ? p.birthday : null,
        showAge: !!(p.birthday && p.birthday.length),
        email: p.email && p.email.length ? p.email : null,
        identitiesSearch: [],
        identities: [],
        links: [],
        pictureUrl: p.pictureUrl && p.pictureUrl.length ? p.pictureUrl : null
      })
      .then(({ insertedId }) => {
        this.people
          .find(
            {
              _id: insertedId
            },
            {
              limit: 1
            }
          )
          .first()
          .then(person => this.setState({ person }));
      });
  };

  signInWithGoogle = () => {
    this.client.auth.loginWithRedirect(new GoogleRedirectCredential());
  };

  signInWithFacebook = () => {
    this.client.auth.loginWithRedirect(new FacebookRedirectCredential());
  };

  signOut = () => {
    this.client.auth.logout().then(() => this.setState({ person: null }));
  };

  render() {
    const { person } = this.state;
    if (this.client.auth.isLoggedIn) {
      if (person) {
        return (
          <Layout>
            <AccountPage
              person={person}
              signOut={this.signOut}
              people={this.people}
            />
            <div className="logout-section">
              <button className="button logout" onClick={this.signOut}>
                Sign out
              </button>
            </div>
          </Layout>
        );
      } else {
        return (
          <Layout>
            <div style={{ padding: "2rem" }}>
              <Loader size={5} />
            </div>
          </Layout>
        );
      }
    }
    return (
      <Layout>
        <div id="sign-in">
          <div className="center">
            <h1 className="title">Sign in</h1>
            <button
              className="button sign-in-button google-sign-in"
              onClick={this.signInWithGoogle}
            >
              <GoogleIcon />
              <span className="sign-in-button-text">Continue with Google</span>
            </button>
            <button
              className="button sign-in-button facebook-sign-in"
              onClick={this.signInWithFacebook}
            >
              <FacebookIcon />
              <span className="sign-in-button-text">
                Continue with Facebook
              </span>
            </button>
          </div>
        </div>
      </Layout>
    );
  }
}
