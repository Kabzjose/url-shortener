import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import pool from "./db.js"
import linksRouter from './routes/links.js'


 dotenv.config()
const app=express()

app.use(cors())
app.use(express.json()) //lets express read JSON requestbodies

//api routes
app.use('/api/links',linksRouter)

//redirect route
app.get('/:slug', async (req,res)=>{
     const {slug} = req.params;
     try {
        const result =await pool.query(
            'UPDATE links SET clicks = clicks + 1 WHERE slug = $1 RETURNING original',
            [slug]
        );
        if (result.rows.lenth ===0)
            return res.status(404).json({error:'link not found'})
        res.redirect(result.rows[0].original) //302 redirects to original URL
     } catch (error) {
        res.status(500).json({error:"server error"})
     }
})

const PORT=process.env.PORT || 4000;
app.listen(PORT,()=>console.log(`server running on port ${PORT}`))
    


