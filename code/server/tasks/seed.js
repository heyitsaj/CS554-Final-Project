import {dbConnection, closeConnection} from '../config/mongoConnection.js';
import {albums, artists, recordcompanies} from '../config/mongoCollections.js';
import * as utilHelper from '../helpers.js'
import * as typeDefs from '../typeDefs.js'
import * as resolvers from '../resolvers.js'
import {v4 as uuid} from 'uuid';

const main = async () => {
  const db = await dbConnection();
  await db.dropDatabase();
  const albumCollection = await albums();
  const artistCollection = await artists();
  const companyCollection = await recordcompanies();

  const artistData = [
    //filler employee data
    {
      _id: uuid(),
      name: 'Pat rick',
      dateFormed: new Date(),
      members: ['mem ber', 'memTwo', 'memThree']
    },
    {
      _id: uuid(),
      name: 'Jimi',
      dateFormed: new Date(),
      members: ['member', 'memTwo', 'memThree']
    },
    {
      _id: uuid(),
      name: 'Jim',
      dateFormed: new Date(),
      members: ['member', 'memTwo', 'memThree']
    },
    {
      _id: uuid(),
      name: 'Roger',
      dateFormed: new Date(),
      members: ['member', 'memTwo', 'memThree']
    },
    {
      _id: uuid(),
      name: 'John',
      dateFormed: new Date(),
      members: ['member', 'memTwo', 'memThree']
    }
  ];

  function getRandomInt(min, max) {
    let lookingForValidNum = true;
    let ranNum = Number.MAX_VALUE * -1;
    while(lookingForValidNum){
      ranNum = Math.floor(Math.random() * max);
      let temp = utilHelper.isValidDate("8/31/2023");
      // found valid num if num is between min and max
      if(ranNum >= min && ranNum <= max)
      {
        lookingForValidNum = true;
        break;
      }
    }
    return ranNum;
  }  

  //await artistCollection.insertMany(artistData);
  const MusicGenreEnum = [
    'POP',
    'ROCK',
    'HIP_HOP',
    'COUNTRY',
    'JAZZ',
    'CLASSICAL',
    'ELECTRONIC',
    'R_AND_B',
    'INDIE',
    'ALTERNATIVE'
  ];

  function getRandomGenre(){
    let randGenre = MusicGenreEnum[getRandomInt(0, MusicGenreEnum.length)];
    return randGenre;
  }

  let idList = [];
  for(let i = 0; i < 5; i++){
    idList.push(uuid());
  }

  // foreach artist insert an album and record company
  for(let i = 0; i < artistData.length; i++){
    let insertResponse = await  artistCollection.insertOne(artistData[i]);
    let foundArtist = await artistCollection.findOne({_id: insertResponse.insertedId});
    //let companyInsertResponse = await  recordCompanyCollection.insertOne(artistData[i]);
    //let foundCompany = await artistCollection.findOne({_id: companyInsertResponse.insertedId});
    let temp = utilHelper.isValidStrArr(foundArtist.members);
    // give two albums to each artist
    for(let j = 0; j < 2; j++){
      let songData = [];
      for(let songIndex = 0; songIndex <= j; songIndex++){
        songData.push(`Song ${i}${j}${songIndex}`);
      }

      let companyData = {
        _id: idList[getRandomInt(0,5)],
        name: `Company ${i}`,
        foundedYear: getRandomInt(1900, 2024),
        country: "USA"
      }

      try{      
        let createdCompanyInfo = await companyCollection.insertOne(companyData); 
      }
      catch { }

      let albumData = [{
        _id: uuid(),
        title: `Title ${i}${j}`,
        releaseDate: new Date(),
        genre: getRandomGenre(),
        artistId: foundArtist._id,
        songs: songData,
        recordCompanyId: companyData._id
      }];

      let createdAlbumInfo = await albumCollection.insertOne(albumData[0]);
    }
    setTimeout(() => { console.log('1/10 sec!'); }, 100);
  }


  // await albumCollection.insertMany([
  //   //filler employer data
  //   {
  //     _id: 1,
  //     title: 'Stevens Institute of Technology',
  //     releaseDate: Date.now(),
  //     genre: "POqqP",
  //     artist: artistCollection[0]
  //   },
    // {
    //   _id: 2,
    //   title: 'Google'
    // },
    // {
    //   _id: 3,
    //   title: 'Apple'
    // }
  //]);

  console.log('Done seeding database');
  await closeConnection();
};

main().catch(console.log);
