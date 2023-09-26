const { MongoClient } = require('mongodb');
const fs = require('fs');

// MongoDB 클러스터의 주소와 옵션 설정
const uri = "mongodb+srv://team16:cap_team16@cluster0.gfbbacs.mongodb.net/GPS";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// 가져올 컬렉션의 이름
const collectionName = 'coordinate';

async function getDataAndSaveToFile() {
  try {
    // MongoDB에 연결
    await client.connect();

    // 데이터베이스와 컬렉션 참조
    const database = client.db();
    const collection = database.collection(collectionName);

    // 데이터 가져오기
    const documents = await collection.find({}).toArray();

    // 데이터를 파일에 저장
    fs.writeFileSync('mongodb-data.json', JSON.stringify(documents, null, 2));
    console.log('mongodb-data.json 파일이 생성되었습니다.');
  } catch (err) {
    console.error('데이터 가져오기 및 파일 저장 오류:', err);
  } finally {
    // 연결 종료
    client.close();
  }
}

// 데이터 가져오기 함수 호출
getDataAndSaveToFile();
