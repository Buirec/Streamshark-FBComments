import { Meteor } from "meteor/meteor";
import { fetch } from "meteor/fetch";

Meteor.methods({
  async 'get_comments'() {
    let url = `https://graph.facebook.com/v22.0/241540867013420/comments?fields=from{name,picture},message,attachment,reactions,created_time,comments{from{name,picture},message,attachment,reactions,created_time}&access_token=${Meteor.settings.token}`
    let comments: any[] = []
    try {
      const response = await fetch(url,
        {
          method: 'GET'
        }
      )
      let comment_data = await response.json()
      comment_data.data.map((comment: any) => {
        comments.push(comment)
      })
      return comments
    }
    catch (err) {
      return err
    }

  }
})