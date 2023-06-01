const File = require('../model/fileModel')
const mongoose = require('mongoose')

// get all workouts
const getFiles = async (req, res) => {
  const files = await File.find({}).sort({year: -1})

  res.status(200).json(files)
}

// get a single file
const getFile = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such File'})
  }

  const file = await File.findById(id)

  if (!file) {
    return res.status(404).json({error: 'No such File'})
  }
  
  res.status(200).json(file)
}

// create new file
const createFile = async (req, res) => {
  const {title, strand, year, authors, pdf} = req.body

  let emptyFields = []

  if(!title) {
    emptyFields.push('Title')
  }
  if(!strand) {
    emptyFields.push(' Strand')
  }
  if(!year) {
    emptyFields.push(' Year')
  }
  if(!authors) {
    emptyFields.push(' Authors')
  }
  if(!pdf) {
    emptyFields.push(' File')
  }
  if(emptyFields.length > 0) {
    return res.status(400).json({ error: emptyFields})
  }

  // add doc to db
  try {
    const file = await File.create({title, strand, year, authors, file: pdf})
    res.status(200).json(file)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// delete a file
const deleteFile = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such File'})
  }

  const file = await File.findOneAndDelete({_id: id})

  if (!file) {
    return res.status(400).json({error: 'No such File'})
  }

  res.status(200).json(file)
}

// update a file
const updateFile = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such File'})
  }

  const file = await File.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  if (!file) {
    return res.status(400).json({error: 'No such File'})
  }

  res.status(200).json(file)
}

module.exports = {
  getFiles,
  getFile,
  createFile,
  deleteFile,
  updateFile
}
