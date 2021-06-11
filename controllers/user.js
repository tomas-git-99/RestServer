const { response, request } = require('express');



const userGet = (req, res = response) => {

    res.json(
            {
                msg:'get api-gatito ',
            }
        )
}

const userPost = (req = request, res = response) => {

    const id = req.params.id;

    res.json(
        {
            msg:'post api-gatito',
            id
            
        }
    )
    console.log(edad)
}

const userPut = (req = request , res = response) => {

    

    res.json(
        {
            msg:'put api-gatito'
        }
    )
}

const userDelete = (req, res = response) => {

    res.json(
        {
            msg:'delete api-gatito',
        }
    )
}




module.exports= {
    userGet,
    userPost,
    userPut,
    userDelete
}