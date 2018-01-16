import React, { Component } from 'react';
import { Grid, Row, FormControl, FormGroup, ControlLabel, Button } from 'react-bootstrap';
import AuthService from '../../services/Authentication/AuthService'
import PostService from '../../services/posts/PostService'
import './Profile.css'


class Profile extends Component {
  constructor() {
    super()
    this.authS = new AuthService();
    this.postS = new PostService();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      user: this.authS.currentUser(),
      profileURL: '/profile_imgs/'
    }

  }
  componentDidMount() {
    if (!this.authS.isLoggedIn()) {
      return this.props.history.replace('/');
    }
    if (this.state.user) {
      this.setState((prevState) => {
        return { profileURL: prevState.profileURL + this.state.user.profileImage }
      })
    }
    console.log(this.state);
    
  }

  handleChange(e) {
    let post = Object.assign({}, this.state.post);
    post[e.target.id] = e.target.value;
    this.setState({ post });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.postS.create(this.state.post)
      .then(res => {
        this.props.history.push('/');
      })
      .catch(err => {
        console.log(err);
      })
  }

  render() {
    return (
      <div>
              <img alt="" src={this.state.profileURL} />
        <div className="card hovercard">
          <div className="card-background">
            <img className="card-bkimg" alt="" src={this.state.profileURL} />
          </div>
          <div className="useravatar image-upload">
            <label htmlFor="file-input">
              <img alt="" src={this.state.profileURL} />
            </label>
            {/* <input id="file-input" type="file" ng2FileSelect [uploader]="uploader" name="profile" /> */}
          </div>
          <div className="card-info">
            {/* <span className="card-title">{{ currentUser.firstName }} {{ currentUser.lastName }}</span> */}
          </div>
        </div>
        <div className="container">
          <div >
            {/* <button type="button" className="btn btn-primary" (click)="uploader.queue[0].upload()">
      <span className="glyphicon glyphicon-upload"></span> Upload
    </button> */}
            <div className="progress">
              {/* <div className="progress-bar" role="progressbar" [ngStyle]="{'width': uploader.progress + '%' }">{{ uploader.progress }}%</div> */}
            </div >
          </div >

          {/* <tabset [justified] = 'true' type = 'pills' >
        <tab heading="My Posts" id="tab1">
          <div className="col-md-12 text-center  margin-top-30">
            <div *ngFor="let post of posts" className="row">
          <div className="well">

              <h4>{{ post.title }}</h4>
              <h5>{{ post.body | sliceString }}</h5>
              <h6>{{ post.createdAt | date: 'medium'}}</h6>
            </div>
          </div>
      </div>
    </tab >
      <tab heading="My Info" id='tab2'>
        <div className="col-md-12 text-center  margin-top-30">
          <form #userForm="ngForm">
          <div className="form-group">
            <label for="name">First Name</label>
            <input type="text" className="form-control" [(ngModel)]="editableUser.firstName" name="fisrtName" required>
          </div>
          <div className="form-group">
            <label for="name">Last Name</label>
            <input type="text" className="form-control" [(ngModel)]="editableUser.lastName" name="lastName" required>
          </div>
          <div className="form-group">
            <label for="name">Email</label>
            <input type="email" className="form-control" [(ngModel)]="editableUser.email" name="email" required>
          </div>

          <div className="form-group">
            <button type="button" className="btn btn-primary" [disabled]="!userForm.form.dirty" (click)="updateUserInfo(editableUser)">Update Info</button>
        </div>
        </form>
      </div >
    </tab >
  </tabset >*/}
        </div >
      </div >
    )
  };
}

export default Profile;
