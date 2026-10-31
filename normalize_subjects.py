import json
from collections import Counter

INPUT_FILE = r"G:\RJCS-PYQ\dataset\processed\all_pyqs.json"
OUTPUT_FILE = r"G:\RJCS-PYQ\dataset\processed\all_pyqs_normalized.json"


# Only merge subjects that are clearly the same subject
# but have different spelling, capitalization, singular/plural,
# or formatting.
SUBJECT_MAPPING = {

    # Java
    "Java": "Core Java",

    # Combinatorics
    "Combinatorics & Graph Theory":
        "Combinatorics and Graph Theory",

    # Physical Computing
    "Physical Computing & IOT Programming":
        "Physical Computing and IoT Programming",

    # Algorithms
    "Fundamentals of Algorithm":
        "Fundamentals of Algorithms",

    # Data Structures
    "Data Structure":
        "Data Structures",

    # Wireless Sensor Network
    "Wireless Sensor Network and Mobile Communication":
        "Wireless Sensor Networks & Mobile Communication",

    "Wireless sensor network and mobile communication":
        "Wireless Sensor Networks & Mobile Communication",

    # Advanced Database Management System
    "ADVANCED DATABASE MANAGEMENT SYSTEM":
        "Advanced Database Management System",

    # Statistics
    "Statistical Method and Testing of Hypothesis":
        "Statistical Methods and Testing of Hypothesis",

    # Digital Systems
    "Digital System and Architecture":
        "Digital Systems & Architecture",
}


def main():
    # Load original master dataset
    with open(INPUT_FILE, "r", encoding="utf-8") as file:
        data = json.load(file)

    if not isinstance(data, list):
        raise ValueError("all_pyqs.json must contain a JSON array.")

    print(f"Loaded {len(data)} questions.")

    # Keep track of changes
    changes = Counter()

    # Normalize subjects
    normalized_data = []

    for question in data:
        new_question = question.copy()

        old_subject = new_question.get("subject")

        if old_subject in SUBJECT_MAPPING:
            new_subject = SUBJECT_MAPPING[old_subject]

            if old_subject != new_subject:
                changes[(old_subject, new_subject)] += 1

            new_question["subject"] = new_subject

        normalized_data.append(new_question)

    # Save normalized dataset
    with open(OUTPUT_FILE, "w", encoding="utf-8") as file:
        json.dump(
            normalized_data,
            file,
            ensure_ascii=False,
            indent=2
        )

    # Report
    original_subjects = sorted(
        set(q.get("subject") for q in data if q.get("subject"))
    )

    normalized_subjects = sorted(
        set(q.get("subject") for q in normalized_data if q.get("subject"))
    )

    print()
    print("=" * 60)
    print("SUBJECT NORMALIZATION COMPLETE")
    print("=" * 60)

    print(f"Questions before : {len(data)}")
    print(f"Questions after  : {len(normalized_data)}")

    print()
    print(f"Unique subjects before : {len(original_subjects)}")
    print(f"Unique subjects after  : {len(normalized_subjects)}")

    print()
    print("Changes made:")

    if changes:
        for (old, new), count in changes.items():
            print(f"  {old} -> {new} ({count} questions)")
    else:
        print("  No subject changes were required.")

    print()
    print(f"Normalized file created:")
    print(OUTPUT_FILE)

    # Safety check
    if len(data) != len(normalized_data):
        raise ValueError("ERROR: Question count changed!")

    print()
    print("Safety check passed: all questions preserved.")


if __name__ == "__main__":
    main()