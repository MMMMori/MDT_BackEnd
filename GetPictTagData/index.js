var aws = require('aws-sdk');
var dynamo = new aws.DynamoDB();

exports.handler = async (event) => {
    let ptag = `${event.tag}`;
    let prm={
        tablename:"PictTagData",//テーブル名
        pk_name:"Tag",//pkの名称
        pk_prm:{S:ptag},//検索pkの指定
    };
    let res= await dynamoquery_pksk(prm);
    
    return res;
};

function dynamoquery_pksk(obj){
    return new Promise((resolve, reject) => {
        let params = {
            "TableName": obj.tablename,
            "KeyConditionExpression": "#pk_name = :pk_prm",//検索条件
            "ExpressionAttributeNames":{
                "#pk_name": obj.pk_name,
            },
            "ExpressionAttributeValues": {
                ":pk_prm": obj.pk_prm,
            }
        };
        dynamo.query(params,function(err, data) {
            if (err) {
                reject(err, err);
            } else {
                resolve(data.Items);
            }
        });
    });
}