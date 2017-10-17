### About

Each month I strive to try new technologies and learn new things. Firebase, a startup eventually aquired by Google, released _Cloud Firestore_, a cloud hosted, flexible, scalable real time database.

It is a document based datastore, as opposed to relational, like the kind a lot of companies use. As opposed to storing data and build relationships using keys, such as IDs, data is saved in collections, which can have more nested collections. 

One of the other services Firebase provides is authentication, among others. I decided to try using these two services to build a real time chat application.

The challenges involved were:

1. Structuring the database
2. Listening for real time updates
3. Displaying the data time time
4. Testing? 
5. Application Design 

### 1. Structuring the Database

A traditional relational database would lend itself to something like this:

Users

| id | email | displayname | password |
|----|-------|-------------|----------|
| 1 | abc@def.com | Abc Man | * * * |
| 2 | def@test.com | DEF Girl | * * * |

Conversations

| id | created |
|----|-------|
| 5 | July 1 |
| 6 | July 4 | 

UsersConversations

| userid | conversationid |
|----|-----|
| 1 | 5 |
| 2 | 5 |


Message

| id | conversationid | text | userid |
| 1 |  5 | Hi there | 2 |

Document based database work a bit differently - namely you can't simply join tables together, so querying data is a bit different. I settled for something like this:

The nice thing about this when a user logs in, you can get all of this conversations in a single query:

``` js
const userConversations = db.collection('users').doc(user_id).get()

userConversations = {
  conversations: [1, 2, 3],
  displayname: 'Some user'
  joined: 1/4/2017
  lastSeen: 1/4/2017
}
```

### 2.Listening for real time updates

Firestore makes this really easy as well.


``` js
db.collection('conversations')
  .doc(currentConversationId)
  .onSnapshot(convo => {
    // The newly updated conversation!
    // Display the messages on the screen :)
  })
```

### 3. Displaying the data time time

This was a little more tricky. Luckily, this problem is fairly common - lots of websites have real time updates, like Facebook when you receive a message or someone likes your photo.

Traaditional websites need to reload the page to show you need data - this is because HTTP, the protocol used by the internet to share websites, is _stateless_. This means that data is not persisted between calls.

This works great for systems where real time updates are required, just the most recent data on each request, like a payroll system. A system like that works as such:

1. User accesses the page
2. The server queries a database, get some data
3. The server constructs the website markup (what you see on the screen) and populates it with data.
4. The server sends the website markup to the user's browser, which renders it.
5. If the user clicks a button or submits a form, send the new data to the server.
6. Repeat.

For something like a chat application, where you only want the most recent data for a particular conversation, and real time updates are essential, we need a way to update the page without refreshing. Enter: JavaScript, a language that operates in the browser, and can manipulate the interface without requiring a reload.

#### Direct DOM manipulation - the "old" way

Let's say the conversation looks like this:

The traditional way to approach this kind of task is as follows.

Old Elements

Message 1: Hi
Message 2: What's up
Message 3: I'm doing great
