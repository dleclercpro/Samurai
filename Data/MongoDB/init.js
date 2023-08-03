/* --------------------------------------------------------------------------------------------- //
   init.js
   Company: Samurai
   Author: David Leclerc
   Date: 26.07.2023
   This is a script meant to initialize users in a MongoDB instance for the Samurai app when
   deploying with Docker.
// --------------------------------------------------------------------------------------------- */

// Root user for the Samurai DB
db.createUser({
    user: 'root',
    pwd: ">'ejSg=9B_[z+Jr:S,BipCj%o%3-fcXz67;>gy{-",
    roles: [
        { role: 'dbAdmin',   db: 'samurai' },
        { role: 'userAdmin', db: 'samurai' },
        { role: 'readWrite', db: 'samurai' },
    ],
});

// Server user for the Samurai DB
db.createUser({
    user: 'server',
    pwd: "qF&b.<B^5tFtNmFF|mhXq`;Mr5tL9yoejK:<Ex[",
    roles: [
        { role: 'readWrite', db: 'samurai' },
    ],
});

// External user for the Samurai DB
db.createUser({
    user: 'external',
    pwd: "Hr{|r*(_7M;RMYfk^aBMETzfLx<YM+ppH{$YYtt#",
    roles: [
        { role: 'read', db: 'samurai' },
    ],
});