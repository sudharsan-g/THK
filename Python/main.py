from tkinter import *
from tkinter import ttk
from tkinter import filedialog as fd
import pandas as pd
import random
from pymongo import MongoClient

from googleapiclient.discovery import build
from google.oauth2 import service_account


# create the root window
root = Tk()
root.title("Tkinter Open File Dialog")
root.config(bg="black")
root.geometry("500x500")

label_file_explorer = Label(
    root,
    text="Choose The File For Backend Data",
    width=100,
    height=4,
    fg="blue",
    bg="black",
)


Process = Label(root, text="", width=100, height=4, fg="white", bg="black")

SCOPE = [
    "https://www.googleapis.com/auth/spreadsheets",
    "https://www.googleapis.com/auth/drive",
]
SERVICE_ACCOUNT_FILE = (
    r"C:\Users\lenovo\Downloads\TechHouse\Python\service_account.json"
)
PARENT_FOLDER_ID = "1EeEpWHYsvV4-bjNwfKo08kcO3S2O8OpO"


backend_file = pd.DataFrame(
    columns=[
        "product_id",
        "category_id",
        "name",
        "mprice",
        "oprice",
        "tag",
        "desc",
        "image",
        "Product_Image",
        "types",
        "PhoneCondition",
        "Category",
        "SubCategory",
        "colors",
    ]
)


def authenticate():
    creds = service_account.Credentials.from_service_account_file(
        SERVICE_ACCOUNT_FILE, scopes=SCOPE
    )
    return creds


def upload_image(file_path):
    img = file_path.split("\\")[-1].split(".")[0]
    creds = authenticate()
    service = build("drive", "v3", credentials=creds)

    file_meta_data = {"name": img, "parents": [PARENT_FOLDER_ID]}

    file = (
        service.files()
        .create(body=file_meta_data, media_body=file_path, fields="id")
        .execute()
    )
    return "https://drive.google.com/file/d/" + file["id"]


def create_dct(Colors, Values, desc):
    dct = {}

    for key, val in zip(Colors, Values):
        if desc == "Tags":
            val = val.split(",")
        elif desc == "Img":
            val = val.split(",")
            val = [upload_image(i) for i in val]
        elif desc == "Price":
            val = int(val)
        dct[key] = val

    return dct


def main_fn(x):
    row = []
    Category = {"Apple": 1, "Android": 2, "Cases": 3, "Accessories": 1}
    row.append(str(random.randint(1, 30000)))
    row.append(Category[x["Category"][0]])
    row.append(x["Product"].values[0])
    row.append(create_dct(x["Color"].values, x["Offical_Price"].values, "Price"))
    row.append(create_dct(x["Color"].values, x["Our_Price"].values, "Price"))
    row.append(create_dct(x["Color"].values, x["Tags"].values, "Tags"))
    row.append(create_dct(x["Color"].values, x["Description"].values, ""))
    row.append(upload_image(x["Listing_Image"].values[0]))
    row.append(create_dct(x["Color"].values, x["Product_Image"].values, "Img"))
    row.append(create_dct(x["Color"].values, x["Types"].values, "Tags"))
    row.append(create_dct(x["Color"].values, x["Phone Condition"].values, ""))
    row.append(x["Category"].values[0])
    row.append(x["SubCategory"].values[0])
    row.append(create_dct(x["Color"].values, x["Color_Code"].values, ""))
    backend_file.loc[len(backend_file)] = row


def select_file():

    filetypes = (("CSV Files", "*.csv"), ("All files", "*.*"))

    filename = fd.askopenfilename(
        title="Open a file", initialdir="/", filetypes=filetypes
    )
    open_button.pack_forget()
    open_button.update()
    print(filename)
    df = pd.read_csv(f"{filename}")
    Process.config(text="Read the Data")
    root.update()
    df.groupby("Product").apply(lambda x: main_fn(x))
    Process.config(text="Completed the Grouping Process")
    root.update()
    backend_file.to_csv("./backend_file.csv", encoding="utf-8", index=False)
    Process.config(text="Saved the Data as CSV")
    root.update()
    MONGO_URI = "mongodb+srv://admin:KaniTBMK%4023@cluster0.nw53mzt.mongodb.net/TechHouse?retryWrites=true&w=majority&appName=Cluster0"
    client = MongoClient(MONGO_URI)
    db = client["TechHouse"]
    Process.config(text="Connect to the Mongo")
    root.update()
    insert_data_to_mongo(db=db, collection_name="products", data_frame=df)
    Process.config(text="Data added sucessfully to the Mongo")
    root.update()


def insert_data_to_mongo(db, collection_name, data_frame):
    collection = db[collection_name]
    records = data_frame.to_dict(orient="records")
    collection.insert_many(records)


open_button = ttk.Button(root, text="Open a File", command=select_file)
close_button = ttk.Button(root, text="Close", command=exit)


label_file_explorer.pack(expand=False, pady=10)
Process.pack(expand=False, pady=10)
open_button.pack(expand=False, pady=5)
close_button.pack(expand=False, pady=5)


root.mainloop()
