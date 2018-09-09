import json, os
import requests

class DataBaseGuy:

    def __init__(self):
        self.env=0
        self.req_count=0
        self.server_url=['http://localhost:3000/'][self.env]

    def send_get(self,segment, rq_headers={}):
        self.req_count+=1
        print('sending request: '+str(self.req_count))
        return requests.get(self.server_url+segment, headers=rq_headers)

    def send_post(self, segment, body={}, rq_headers={"Content-Type": "application/json"}, validate=True):
        self.req_count+=1
        print(validate)
        if(validate):
            rq_headers['author']='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoic2FyYW5zaCIsImRldmljZUlkIjoiNzE0OS4wMDA2ODA2NTAwODQiLCJpYXQiOjE1MzY1MDc2OTd9._XqVWyisnAFoawt8rIbbN_L753tMOaATNPkYzSzsJ3I'
        print('sending request: '+str(self.req_count))
        return requests.post(self.server_url+segment, data=json.dumps(body), headers=rq_headers)                             


class Dsclz_Db_Guy:

    def __init__(self):
        self.db_guy=DataBaseGuy()
        self.target_data=json.loads(open('DBData.json').read().encode('utf-8'))
        print(self.db_guy.send_get('drop').text)
        self.posts=['addnewuser','validateUserLogin','addcomment','addWorth']
        self.run_JSON()
    
    def add_tags(self):
        tag={
            "tag": "dev-tasks",
            "quesIds": ",0.1,",
            "desc": "Developer Tasks"
        }

    def run_JSON(self):
        for key in self.posts:
            for data in self.target_data[key]:
                print('/'.join((self.db_guy.server_url,key)),data)
                self.db_guy.send_post(key, data, validate=key not in ['addnewuser','validateUserLogin'])

x=Dsclz_Db_Guy()
