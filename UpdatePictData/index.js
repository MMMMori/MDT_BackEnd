var aws = require('aws-sdk');
var dynamo = new aws.DynamoDB();

exports.handler = async (event) => {
    let pid = `${event.id}`;
    let pheart = `${event.heart}`;
    let prose = `${event.rose}`;
    let ppresent = `${event.present}`;
    let pdiamond = `${event.diamond}`;
    let ptype = `${event.type}`;
    let prm = {
        TableName: "PictData",
        Key: {
            ID: {S: pid}
        },
        UpdateExpression: "set #v1=:v1,#v2=:v2,#v3=:v3,#v4=:v4",
        ExpressionAttributeNames:{
            //カラム名
            "#v1":"Heart",
            "#v2":"Rose",
            "#v3":"Present",
            "#v4":"Diamond"
        },
        ExpressionAttributeValues: {
            //カラムの値
            ":v1": {N:count(pheart,"heart", ptype)},
            ":v2": {N:count(prose,"rose", ptype)},
            ":v3": {N:count(ppresent,"present", ptype)},
            ":v4": {N:count(pdiamond,"diamond", ptype)}
        }
    };

    let res= await dynamo_update(prm);
    
    return res;
};

function dynamo_update(params){
    return new Promise((resolve, reject) => {
        dynamo.updateItem(params,function(err, data) {
            if (err) {
                reject(err, err);
            } else {
                resolve("updated");
            }
        });
    });
}
function count (count, type, countuptype){
    if (type === countuptype) return String(Number(count) +1)
    return count
}