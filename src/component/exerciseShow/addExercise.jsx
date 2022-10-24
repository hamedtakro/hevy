import React from 'react'

const AddExercise = () => {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    return (
        <div>
            <div className='libaryTitle'>

                <a className='pointer' onClick={handleOpen}>+ Create Exercise</a>
            </div>
            <Hidden smUp>
                <Button onClick={handleOpen} className="float-end  md:h-10  " color="primary" variant="contained" >
                    create Exercise
                </Button>
            </Hidden>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className="modalBox">
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Create Exercise
                    </Typography>
                    <div className="container">
                        <div {...getRootProps({ className: 'dropzone , pointer' })} >
                            <input {...getInputProps()} />
                            {!isDragActive && (
                                <>
                                    <Stack direction="row" spacing={2}>
                                        <Avatar sx={{
                                            width: '80px', height: '80px', border: 'solid 2px rgb(224, 224, 224)',
                                            backgroundColor: '#fff'
                                        }}>
                                            <CameraAltIcon sx={{ fontSize: '2rem', color: '#000' }} />
                                        </Avatar>
                                    </Stack>
                                    <h3>Add Image</h3>
                                </>
                            )}
                        </div>
                    </div>
                    <div className="listcreateExercise">
                        <input type="text" id="lname" name="lname" placeholder="Exercise Name"></input>
                    </div>
                    <div className="formatSelect">
                        <h3>Exercise Type</h3>
                        <div style={{ width: '300px' }} className="formatControler">
                            <FormControl className="formControl" >
                                <InputLabel sx={{ lineHeight: '.7em' }}
                                    id="demo-simple-select-autowidth-label">Select</InputLabel>
                                <Select
                                    sx={{ height: '40px' }}
                                    id="demo-simple-select-autowidth"
                                    value={text}
                                    onChange={handlChange}
                                    autoWidth
                                    label="Select"
                                >
                                    <MenuItem value="" sx={{ width: '290px' }}>
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={10}>Twenty</MenuItem>
                                    <MenuItem value={21}>Twenty one</MenuItem>
                                    <MenuItem value={22}>Twenty one and a half</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                    </div>
                    <hr style={{ margin: '20px 0' }}></hr>
                    <div className="formatSelect">
                        <h3>Equipment</h3>
                        <div className="formatControler">
                            <FormControl className="formControl" >
                                <InputLabel sx={{ lineHeight: '.7em' }}
                                    id="demo-simple-select-autowidth-label">Select</InputLabel>
                                <Select
                                    sx={{ height: '40px' }}
                                    id="demo-simple-select-autowidth"
                                    value={text}
                                    onChange={handlChange}
                                    autoWidth
                                    label="Select"
                                >
                                    <MenuItem value="" sx={{ width: '190px' }}>
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={10}>Twenty</MenuItem>
                                    <MenuItem value={21}>Twenty one</MenuItem>
                                    <MenuItem value={22}>Twenty one and a half</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                    </div>
                    <hr style={{ margin: '20px 0' }}></hr>
                    <div className="formatSelect">
                        <h3>Primary Muscle Group</h3>
                        <div className="formatControler">
                            <FormControl className="formControl" >
                                <InputLabel sx={{ lineHeight: '.7em' }}
                                    id="demo-simple-select-autowidth-label">Select</InputLabel>
                                <Select
                                    sx={{ height: '40px' }}
                                    id="demo-simple-select-autowidth"
                                    value={text}
                                    onChange={handlChange}
                                    autoWidth
                                    label="Select"
                                >
                                    <MenuItem value="" sx={{ width: '190px' }}>
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={10}>Twenty</MenuItem>
                                    <MenuItem value={21}>Twenty one</MenuItem>
                                    <MenuItem value={22}>Twenty one and a half</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                    </div>
                    <hr style={{ margin: '20px 0' }}></hr>
                    <div className="formatSelect">
                        <h3>Other Muscles</h3>
                        <div className="formatControler">
                            <FormControl className="formControl" >
                                <InputLabel sx={{ lineHeight: '.7em' }}
                                    id="demo-simple-select-autowidth-label">Select</InputLabel>
                                <Select
                                    sx={{ height: '40px' }}
                                    id="demo-simple-select-autowidth"
                                    value={text}
                                    onChange={handlChange}
                                    autoWidth
                                    label="Select"
                                >
                                    <MenuItem value="" sx={{ width: '190px' }}>
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={10}>Twenty</MenuItem>
                                    <MenuItem value={21}>Twenty one</MenuItem>
                                    <MenuItem value={22}>Twenty one and a half</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                    </div>
                    <div className="saveExercise">
                        <button>Save Routine</button>
                    </div>
                </Box>
            </Modal>
        </div>


    )
}

export default AddExercise
