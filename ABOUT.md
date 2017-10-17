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

### Structuring the Database

A traditional relational database would lend itself to something like this:

Users

| id | email | displayname | password |
| 1 | abc@def.com | Abc Man | * * * |
