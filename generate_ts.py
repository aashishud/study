import json

data = json.load(open('film_comm_data.json', encoding='utf-8'))

ts_content = 'import { SubjectData } from "./types";\n\n'
ts_content += 'export const filmCommunicationData: SubjectData[] = [\n'

sections_mapping = [
    ('15_marks', 'SECTION 1: 15-Mark Long Questions (Massive)'),
    ('8_7_marks', 'SECTION 2: 8 to 7 Marks Theory Questions'),
    ('5_marks', 'SECTION 3: 5 Marks Short Notes')
]

for key, title in sections_mapping:
    ts_content += f'  {{\n    section: "{title}",\n    items: [\n'
    for item in data[key]:
        q = item['q'].replace('"', '\\"').replace('\n', ' ')
        a = item['a'].replace('"', '\\"').replace('\n', '\\n')
        ts_content += f'      {{\n        q: "{q}",\n        a: "{a}"\n      }},\n'
    ts_content += '    ]\n  },\n'

ts_content += '];\n'

with open('src/data/filmCommunication.ts', 'w', encoding='utf-8') as f:
    f.write(ts_content)

print('TS file generated successfully!')
