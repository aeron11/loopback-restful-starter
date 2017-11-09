# loopback-restful-starter

  this is a simple project use loopback framework which based on node.js and mongodb/mysql to build restful api,using this project you will create an api services with less code.


## shell
```
$ git clone /loopback-restful-starter.git
$ cd loopback-restful-starter
$ npm install
$ npm run devstart or node .

```

## loopback cmd
```
  $ slc loopback:datasource
  $ slc loopback:model
  $ slc loopback:relation
  $ slc acl
```


## loopback provide a GUIto create Model／DataSources／Build and Deploy etc operations
```
  $ slc arc
```

## for online
```
  $ npm install -g strong-pm
  $ slc pm
```

## use pm2 to start your service

```
  $ npm install -g pm2
  $ pm2 start 'server/server.js' or npm run start
```


### check all APIs through this [link](http://localhost:3000/explorer) after start service

### call api url examples：
    http://localhost:3000/api/departments
    http://localhost:3000/api/departments/1

    pagenation
    http://localhost:3000/api/projects?filter[limit]=10&filter[skip]=1&access_token=KOo7StYUOKG8MCHzq3qidYBFx4EBXH1qvP37KkRgwPGvvrB19WH3gFyFGBfgEru2
    
    get total count
    http://localhost:3000/api/projects/count?access_token=KOo7StYUOKG8MCHzq3qidYBFx4EBXH1qvP37KkRgwPGvvrB19WH3gFyFGBfgEru2

    use where condition
    http://localhost:3000/api/departments?filter[where][id]=1
    http://localhost:3000/api/projects?filter[where][and][0][name]=project 2&filter[where][and][1][teamId]=2&access_token=KOo7StYUOKG8MCHzq3qidYBFx4EBXH1qvP37KkRgwPGvvrB19WH3gFyFGBfgEru2


    join tables
    http://localhost:3000/api/projects?filter[include]=team&access_token=KOo7StYUOKG8MCHzq3qidYBFx4EBXH1qvP37KkRgwPGvvrB19WH3gFyFGBfgEru2
    http://localhost:3000/api/projects?filter[include][team]=department&access_token=KOo7StYUOKG8MCHzq3qidYBFx4EBXH1qvP37KkRgwPGvvrB19WH3gFyFGBfgEru2

    fuzze queries
    http://localhost:3000/api/projects?filter[where][name][regexp]=/^pro/i&access_token=KOo7StYUOKG8MCHzq3qidYBFx4EBXH1qvP37KkRgwPGvvrB19WH3gFyFGBfgEru2

## Notice
  when calling api,if you set ACL for Model, you should add parameter access_token each time you call,more info please visit[`loopback`](https://github.com/strongloop/loopback)


  you should install mongodb or mysql on your dev enviroment if you want to start this project successfully.





