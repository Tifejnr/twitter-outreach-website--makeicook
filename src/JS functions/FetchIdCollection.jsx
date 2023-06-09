
let idCollections;


export default async function FetchIDCollections() {
    const url = "http://localhost:3000/start";
    const dataSent = { send: true };

    try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataSent),
    });

    const dataRaw = await response.json();


    if (dataRaw.error) {
      if (dataRaw.error.code === "ENOTFOUND")
        return console.log("No internet network");
    }

    const data = dataRaw.boards;
    idCollections = [];

   const idCollectionsFinal = data.map((board, index) => {
      const boardId = board.id;
      idCollections.push(boardId);
    return idCollections
    });


    
    console.log(idCollectionsFinal)


    return idCollectionsFinal
        
    } catch (error) {
        console.log(error)
    }

  }
