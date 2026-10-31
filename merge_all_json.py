from pathlib import Path
import json
from collections import Counter


# --------------------------------------------------
# PATHS
# --------------------------------------------------

BASE_DIR = Path(__file__).resolve().parent

OCR_DIR = BASE_DIR / "dataset" / "ocr"
OUTPUT_DIR = BASE_DIR / "dataset" / "processed"
OUTPUT_FILE = OUTPUT_DIR / "all_pyqs.json"

OUTPUT_DIR.mkdir(parents=True, exist_ok=True)


# --------------------------------------------------
# LOAD ALL JSON TXT FILES
# --------------------------------------------------

all_questions = []

files_processed = 0
files_failed = 0

print("=" * 60)
print("RJCS-PYQ MASTER DATASET BUILDER")
print("=" * 60)

print(f"\nReading from:")
print(OCR_DIR)

print(f"\nSaving to:")
print(OUTPUT_FILE)

print("\n" + "=" * 60)


for txt_file in sorted(OCR_DIR.rglob("*.txt")):

    try:

        with open(txt_file, "r", encoding="utf-8") as file:
            data = json.load(file)

        if not isinstance(data, list):

            print(f"\nSKIPPED: {txt_file}")
            print("Reason: File does not contain a JSON array.")

            continue

        valid_records = 0

        for item in data:

            if not isinstance(item, dict):
                continue

            record = dict(item)

            # Remove an old ID if one exists.
            # We will create fresh IDs after merging everything.
            record.pop("id", None)

            all_questions.append(record)

            valid_records += 1

        files_processed += 1

        print(
            f"\nAdded {valid_records} questions:"
        )

        print(txt_file)

    except Exception as error:

        files_failed += 1

        print(f"\nFAILED: {txt_file}")
        print(f"Reason: {error}")


# --------------------------------------------------
# ADD UNIQUE IDs
# --------------------------------------------------

for index, question in enumerate(all_questions, start=1):

    question["id"] = index


# --------------------------------------------------
# SAVE MASTER DATASET
# --------------------------------------------------

with open(
    OUTPUT_FILE,
    "w",
    encoding="utf-8"
) as file:

    json.dump(
        all_questions,
        file,
        ensure_ascii=False,
        indent=2
    )


# --------------------------------------------------
# STATISTICS
# --------------------------------------------------

year_counts = Counter(
    item.get("year", "Unknown")
    for item in all_questions
)

semester_counts = Counter(
    str(item.get("semester", "Unknown"))
    for item in all_questions
)

subject_counts = Counter(
    item.get("subject", "Unknown")
    for item in all_questions
)


# --------------------------------------------------
# FINAL REPORT
# --------------------------------------------------

print("\n")
print("=" * 60)
print("MASTER DATASET CREATED")
print("=" * 60)

print(f"\nTotal questions: {len(all_questions)}")

print(f"Files processed: {files_processed}")
print(f"Files failed: {files_failed}")

print(f"\nSaved to:")
print(OUTPUT_FILE)


print("\n" + "=" * 60)
print("YEAR COUNTS")
print("=" * 60)

for year, count in sorted(year_counts.items()):

    print(f"  {year}: {count}")


print("\n" + "=" * 60)
print("SEMESTER COUNTS")
print("=" * 60)

for semester, count in sorted(
    semester_counts.items(),
    key=lambda x: x[0]
):

    print(f"  Semester {semester}: {count}")


print("\n" + "=" * 60)
print("SUBJECT COUNTS")
print("=" * 60)

for subject, count in sorted(
    subject_counts.items(),
    key=lambda x: x[0].lower()
):

    print(f"  {subject}: {count}")


print("\n" + "=" * 60)
print("DONE")
print("=" * 60)