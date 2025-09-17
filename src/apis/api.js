import request from"@/utils/request"

//系统相关
export const login = (data) =>{
    return request.post('/user/login',data)
}
//plm看图

//根据文件地址获取文件流

export const getFileByname = (filepath) =>{
    return request({
        url: "/PLM/getbyname?remoteFilePath=smb://192.168.1.32/filedata" + filepath,
        method: 'get',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
        responseType: 'blob',
    })
}

//查询客户原图
export const getCustomerOringinalPicture = (name) =>{
    return request.get('/CustomerOriginalPicture/getlistbyname?name=' + name)
}

//查询图纸工艺
export const getDrawingProcess = (name) =>{
    return request.get('/DrawingProcess/getlistbyname?name=' + name)
}

//通过卡号查询图纸工艺
export const getDrawingProcessByCardNumber = (cardnumber) =>{
    return request.get('/DrawingProcess/getlistbycardnumber?cardnumber=' + cardnumber)
}


//查询图号查询图纸工艺
export const getDrawingProcessByFigureNumber = (figurenumber) =>{
    return request.get('/DrawingProcess/getlistbyfigurenumber?figurenumber=' + figurenumber)
}

//查询检验指导书
export const getInspectionInstruction = (name) =>{
    return request.get('/InspectionInstruction/getlistbyname?name=' + name)
}

//查询原材料标准
export const getMaterialInstruction = (name) =>{
    return request.get('/MaterialInstruction/getlistbyname?name=' + name)
}

//查询型材图
export const getProfileDraw = (name) =>{
    return request.get('/ProfileDraw/getlistbyname?name=' + name)
}

//查询编程用图
export const getProgramDiagram = (name) =>{
    return request.get('/ProgramDiagram/getlistbyname?name=' + name)
}

//查询作业指导书

//根据名称
export const getWorkInstruction = (name) =>{
    return request.get('/WorkInstruction/getlistbyname?name=' + name)
}
//扫描工单获取所有作业指导书
export const getWorkInstructionByCardNumber = (cardnumber) =>{
    return request.get('/WorkInstruction/getlistbycardnumber?cardnumber=' + cardnumber)
}
//扫描工单获取标签作业指导书
export const getLableWorkInstructionByCardNumber = (cardnumber) =>{
    return request.get('/WorkInstruction/getlabellistbycardnumber?cardnumber=' + cardnumber)
}

//根据名称获取本批有效图
export const getValidDiagram = (name) =>{
    return request.get('/ValidDiagram/getlistbyname?name=' + name)
}


//用户管理





























