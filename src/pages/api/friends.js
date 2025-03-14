
export default async (req,res)=> {
    if(req.method === 'GET') {
        res.status(200).json({"value": "jiangly"})
    }
    else {
        res.status(405).json({message: 'Method Not Allowed'})
    }
}