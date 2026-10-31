from pathlib import Path

from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.http import MediaIoBaseDownload


# --------------------------------------------------
# GOOGLE DRIVE SETTINGS
# --------------------------------------------------

SCOPES = ["https://www.googleapis.com/auth/drive.readonly"]

BASE_DIR = Path(__file__).resolve().parent

CREDENTIALS_FILE = BASE_DIR / "credentials.json"
TOKEN_FILE = BASE_DIR / "token.json"

PYQ_ROOT_FOLDER_ID = "189P6K0oMd-b12RMSXRRiRaS0Pysx_6XY"

# G:\RJCS-PYQ\dataset\raw
RAW_DATASET_DIR = BASE_DIR.parent / "dataset" / "raw"


# --------------------------------------------------
# GOOGLE DRIVE AUTHENTICATION
# --------------------------------------------------

def get_drive_service():

    creds = None

    if TOKEN_FILE.exists():
        creds = Credentials.from_authorized_user_file(
            str(TOKEN_FILE),
            SCOPES
        )

    if not creds or not creds.valid:

        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())

        else:
            flow = InstalledAppFlow.from_client_secrets_file(
                str(CREDENTIALS_FILE),
                SCOPES
            )

            creds = flow.run_local_server(port=0)

        with open(TOKEN_FILE, "w") as token:
            token.write(creds.to_json())

    return build(
        "drive",
        "v3",
        credentials=creds
    )


# --------------------------------------------------
# GET ITEMS INSIDE A FOLDER
# --------------------------------------------------

def get_children(service, folder_id):

    children = []

    page_token = None

    while True:

        response = service.files().list(
            q=f"'{folder_id}' in parents and trashed = false",
            spaces="drive",
            fields=(
                "nextPageToken, "
                "files(id, name, mimeType, modifiedTime, size)"
            ),
            pageSize=100,
            pageToken=page_token
        ).execute()

        children.extend(response.get("files", []))

        page_token = response.get("nextPageToken")

        if not page_token:
            break

    return children


# --------------------------------------------------
# DOWNLOAD ONE PDF
# --------------------------------------------------

def download_pdf(service, file_id, file_name, output_path):

    output_path.parent.mkdir(
        parents=True,
        exist_ok=True
    )

    # Skip if file already exists
    if output_path.exists():

        print(f"   [exists] {output_path}")

        return

    print(f"   ↓ Downloading: {file_name}")

    request = service.files().get_media(
        fileId=file_id
    )

    with open(output_path, "wb") as file:

        downloader = MediaIoBaseDownload(
            file,
            request
        )

        done = False

        while not done:

            status, done = downloader.next_chunk()

            if status:
                progress = int(status.progress() * 100)

                print(
                    f"      {progress}%"
                )

    print(f"   ✓ Saved: {output_path}")


# --------------------------------------------------
# RECURSIVE FOLDER SCANNER
# --------------------------------------------------

def scan_folder(
    service,
    folder_id,
    folder_path=""
):

    items = get_children(
        service,
        folder_id
    )

    for item in items:

        name = item["name"]
        item_id = item["id"]
        mime_type = item["mimeType"]

        current_path = (
            f"{folder_path}/{name}"
            if folder_path
            else name
        )

        # ------------------------------------------
        # FOLDER
        # ------------------------------------------

        if mime_type == "application/vnd.google-apps.folder":

            # Ignore MSc completely
            if name.lower() == "msc computer science":

                print(
                    f"\n[ignored folder] {current_path}"
                )

                continue

            print(
                f"\n📁 {current_path}"
            )

            scan_folder(
                service,
                item_id,
                current_path
            )

        # ------------------------------------------
        # PDF
        # ------------------------------------------

        elif mime_type == "application/pdf":

            print(
                f"\n📄 {current_path}"
            )

            # Remove "PYQ Papers/" from path
            relative_path = Path(
                current_path
            )

            if relative_path.parts[0] == "PYQ Papers":
                relative_path = Path(
                    *relative_path.parts[1:]
                )

            output_path = (
                RAW_DATASET_DIR /
                relative_path
            )

            download_pdf(
                service,
                item_id,
                name,
                output_path
            )

        # ------------------------------------------
        # OTHER FILE TYPES
        # ------------------------------------------

        else:

            print(
                f"   [ignored] {current_path}"
            )


# --------------------------------------------------
# MAIN
# --------------------------------------------------

def main():

    print(
        "\nConnecting to Google Drive...\n"
    )

    service = get_drive_service()

    print(
        "Connected to Google Drive successfully."
    )

    RAW_DATASET_DIR.mkdir(
        parents=True,
        exist_ok=True
    )

    print(
        f"\nDownload location:"
        f"\n{RAW_DATASET_DIR}\n"
    )

    print(
        "Scanning and downloading B.Sc. PYQs...\n"
    )

    scan_folder(
        service,
        PYQ_ROOT_FOLDER_ID,
        "PYQ Papers"
    )

    print(
        "\n--------------------------------"
    )

    print(
        "Download completed."
    )

    print(
        "--------------------------------\n"
    )


if __name__ == "__main__":
    main()