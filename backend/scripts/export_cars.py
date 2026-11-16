"""Export the v1 `cars` collection to JSON and check the count matches the live DB.

Run from backend/:  python scripts/export_cars.py [output_path]
Default output:     exports/cars_v1_<YYYY-MM-DD>.json  (git-ignored: it holds real data)
"""
import json
import os
import sys
from datetime import date

sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))

from bson import json_util  # noqa: E402

from data_base import cars  # noqa: E402


def main():
    out_path = sys.argv[1] if len(sys.argv) > 1 else os.path.join(
        "exports", f"cars_v1_{date.today().isoformat()}.json")
    os.makedirs(os.path.dirname(out_path) or ".", exist_ok=True)

    docs = list(cars.find())
    with open(out_path, "w") as f:
        f.write(json_util.dumps(docs, indent=2))

    with open(out_path) as f:
        exported = len(json.load(f))
    live = cars.count_documents({})

    print(f"Exported {exported} cars to {out_path}; live DB has {live}.")
    if exported != live:
        print("Count mismatch: the collection changed during export, run it again.")
        sys.exit(1)


if __name__ == "__main__":
    main()
