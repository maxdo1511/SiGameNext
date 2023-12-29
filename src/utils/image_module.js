import config from "@/app/config";

function getByteArrayFromImage(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => {
            const arrayBuffer = reader.result;
            const uintArray = new Uint8Array(arrayBuffer);
            resolve(uintArray);
        };

        reader.onerror = (error) => {
            reject(error);
        };

        reader.readAsArrayBuffer(file);
    });
}

export function handleImageUpload(event){
    const file = event.target.files[0];
    getByteArrayFromImage(file).then(
        reject => {
            fetch(config.add_icon, {
                method: "POST",
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token")
                },
                body: reject,
            }).then((response) => response)
                .then((data) => {
                    console.log(data)
                })
                .catch((error) => {
                    console.log("not ok")
                });
        }
    )
}