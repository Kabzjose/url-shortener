import express from 'express'
import { nanoid } from 'nanoid'
import pool from '../db.js'

const router=express.Router()

//post
router.post('/',async (req,res)=>{
    const {original, alias }= req.body;
    if(!original) return res.status(400).json({error:'URL is required' })
   
        const slug =alias || nanoid(6); //use cutsom alias or generate one
        try {
            const result=await pool.query(
                `INSERT INTO links (original,slug) VALUES ($1,$2) RETURNING *`,
                [original,slug]
            );
            res.status(201).json(result.rows[0])
        } catch (error) {
            if (error.code === '23505') //postgres unique violation code
            return res.status(409).json({error: 'Alias already taken'})
            res.status(500).json({error:'server error'})
        }
})


//fet
router.get('/',async (req,res)=>{
    try {
        const result=await pool.query(
            'SELECT * FROM links ORDER BY created_at DESC'
        )
        res.json(result.rows)
    } catch (error) {
        res.status(500).json({error:'server error'})
    }
})

//delete
router.delete('/:slug',async (req,res)=>{
    const {slug} =req.params
    try {
        await pool.query('DELETE FROM links WHERE slug=$1',[slug])
        res.json({message: "Link deleted"})
    } catch (error) {
        res.status(500).json({error:'server error'})
    }
})

export default router;
