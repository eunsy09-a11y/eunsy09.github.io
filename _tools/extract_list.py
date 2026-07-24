import re, json

s = open(r"C:\Users\user\Desktop\eunsy09\eunsy09.github.io\data.js", encoding="utf-8").read()
pattern = re.compile(
    r'id:\s*"([^"]+)",\s*name:\s*"([^"]+)",\s*region:\s*"([^"]+)",\s*type:\s*"([^"]+)",\s*\n\s*lat:[^,]+,\s*lng:[^,]+,\s*tier:\s*"([^"]+)"'
)
items = pattern.findall(s)
print(len(items))
out = [{"id": i[0], "name": i[1], "region": i[2], "type": i[3], "tier": i[4]} for i in items]
json.dump(out, open(r"C:\Users\user\Desktop\eunsy09\eunsy09.github.io\_tools\uni_list.json", "w", encoding="utf-8"), ensure_ascii=False, indent=0)
