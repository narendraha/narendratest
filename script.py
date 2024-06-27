import json
import sys
 
with open('main_package.json') as fil:
    prev_package_json = json.load(fil)
 
with open('package.json') as f:
    curr_package_json = json.load(f)
 
 
modified={}
newly_added={}
removed={}
 
prev_dependencies = prev_package_json['dependencies']
 
curre_dependencies = curr_package_json['dependencies']
for i in curre_dependencies.keys():
    if i in prev_dependencies.keys():
        if prev_dependencies[i]==curre_dependencies[i]:
            continue
        else:
            modified[i]=curre_dependencies[i]
    else:
        newly_added[i]=curre_dependencies[i]
 
for i in prev_dependencies.keys():
    if i not in curre_dependencies.keys():
        removed[i]=prev_dependencies[i]
    else:
        pass
 
 
print(f"{len(newly_added)} Newly added Dependencies")
print(newly_added)
print(f"{len(modified)} Versions are modified for dependencies")
print(modified)
print(f"{len(removed)} Rmovied Dependencies")
print(removed)
 
if len(modified)>0 or len(removed)>0 or len(newly_added)>0:
    sys.exit(1)
else:
    print("Nothing is changed" )
    sys.exit(0)