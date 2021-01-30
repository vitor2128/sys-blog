const express = require('express')
const router = express()
const Category = require('./Category')
const slugify = require('slugify')

//Rota criar nova categoria
router.get('/admin/categories/new', (req, res) => {
    res.render('admin/categories/new')
})

//Salvar nova categoria 
router.post('/categories/save', (req, res) => {
    var title = req.body.title
    if(title != undefined) {
        
        Category.create({
            title: title,
            slug: slugify(title)
        }).then(() =>{
            res.redirect('/admin/categories')
        })

    }else {
        res.redirect('/admin/categories/new')
    }
})

//Listar categorias
router.get('/admin/categories', (req,res) => {

    Category.findAll().then(categories =>{
        res.render('admin/categories/index', {
            categories:categories
        })
    })
})

//Deletar categoria 
router.post('/categories/delete', (req, res) => {
    var id = req.body.id
    if(id != undefined){
        if(!isNaN(id)){

            Category.destroy({
                where: {
                    id: id
                }
            }).then (() =>{
                res.redirect('/admin/categories')
            })

        }else{//não for um numero
            res.redirect('/admin/categories')
        }
    }else{// for vazio(null)
        res.redirect('/admin/categories')
    }
})

//Rota para editar categoria
router.get('/admin/categories/edit/:id', (req, res) => {
    var id = req.params.id

    if(isNaN(id)){
        res.redirect('/admin/categories')
    }

    Category.findByPk(id).then(category => {
        if(category != undefined){

            res.render('admin/categories/edit', {
                category: category
            })

        }else{
            res.redirect('/admin/categories')
        }
    }).catch(erro => {
        res.redirect('/admin/categories')
    })
})

//Rota para salvar edição da categoria
router.post('/categories/update', (req,res) => {
    var id = req.body.id //quando vai receber via formulario usar req.body
    var title = req.body.title

    Category.update({title: title,slug: slugify(title)},{
            where: {
                id: id
            }
        }).then(() => {
            res.redirect('/admin/categories')
        })
})


module.exports = router