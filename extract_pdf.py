import json
import re

with open('raw_text.txt', 'r', encoding='utf-8') as f:
    text = f.read().replace('\u200b', '')

sections = re.split(r'-\s+(15-mark questions|8 to 7 Marks|5 Marks)', text, flags=re.IGNORECASE)

data = {
    "15_marks": [],
    "8_7_marks": [],
    "5_marks": []
}

current_category = None
for part in sections:
    if "15-mark questions" in part.lower():
        current_category = "15_marks"
        continue
    elif "8 to 7 marks" in part.lower():
        current_category = "8_7_marks"
        continue
    elif "5 marks" in part.lower():
        current_category = "5_marks"
        continue
    
    if not current_category: continue

    ans_splits = re.split(r'\nAns:?\s+', "\n" + part.strip())
    
    questions = []
    answers = []
    
    for i in range(len(ans_splits) - 1):
        block = ans_splits[i]
        
        # FIXED: Added \s* instead of \s+ because "14.Discuss" had no space!
        matches = list(re.finditer(r'\n(\d+)\.\s*', block))
        if matches:
            last_match = matches[-1]
            q_text = block[last_match.start():].strip()
            if i > 0:
                answers.append(block[:last_match.start()].strip())
            questions.append(q_text)
        else:
            q_text = block.strip()
            if i > 0:
                parts = block.rsplit('\n\n', 1)
                if len(parts) == 2:
                    answers.append(parts[0].strip())
                    questions.append(parts[1].strip())
                else:
                    answers.append("")
                    questions.append(block.strip())
            else:
                questions.append(q_text)
                
    answers.append(ans_splits[-1].strip())
    
    for q, a in zip(questions, answers):
        data[current_category].append({"q": q, "a": a})

with open("film_comm_data.json", "w", encoding="utf-8") as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print(f"Extracted {len(data['15_marks'])} 15-mark, {len(data['8_7_marks'])} 8-7 mark, {len(data['5_marks'])} 5-mark.")
