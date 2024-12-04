import { VisitService } from 'src/services/visit.service';
import { MongoVisitRepository } from 'src/repositories/mongo.visit.repository';
import { MongoDbRepository } from 'src/repositories/mongo.db.repository';
import { BulkResult, BulkVisitRequestDto, GetVisitRequestDto, GetVisitResponseDto, PaginatedResult, PostVisitRequestDto } from 'src/contracts/dtos';
import { Test } from '@nestjs/testing';
import { IDbRepository } from 'src/repositories/db.repository.interface';
import { IVisitRepository } from 'src/repositories/visit.repository.interface';
import { IVisitService } from 'src/services/visit.service.interface';
import { MongoClient } from 'mongodb';
import { VisitController } from 'src/controllers/visit.controller';
import { Request } from 'express';
import { decodeJwt } from 'src/services/jwt.service';

// Mock the jwt.service module
jest.mock('src/services/jwt.service', () => ({
    decodeJwt: jest.fn(),  // Mock the decodeJwt function
  }));

describe('VisitController', () => {
  let visitService: IVisitService;
  let visitRepository: IVisitRepository;
  let visitController: VisitController;
  let mongoDb: IDbRepository<MongoClient>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
        controllers: [VisitController],
        providers:[
          {
              provide: IVisitRepository,
              useClass:MongoVisitRepository,
          },
          {
              provide: IVisitService,
              useClass: VisitService,
          },
          {
              provide: IDbRepository,
              useClass: MongoDbRepository,
          },
      ] ,
        imports:[]
      }).compile();

      mongoDb = moduleRef.get(IDbRepository);
      visitRepository = moduleRef.get(IVisitRepository);
      visitService = moduleRef.get(IVisitService);
      visitController = moduleRef.get(VisitController);
  });

  describe('getVisits', () => {
    it('should return a PaginatedResult with data of GetVisitResponseDto', async () => {
      //Arrange
      const decodedJwt = { "custom:organization_id": "123" };
      (decodeJwt as jest.Mock).mockReturnValue(decodedJwt);
      const mockRequest: Request = {
        headers:{
            authorization:"Bearer test"
        },
        params: {
        },
        body: {},
        query: {
          limit: 10,
          offset: 0,
        },
      } as any; 
      const mockResult:PaginatedResult<GetVisitResponseDto> = {
          data:[
              {
                  time: new Date(),
                  url:"llm.com"
              }
            ],
          totalCount: 10,
          totalPages: 5
      }
      jest.spyOn(visitRepository, 'getVisits').mockImplementation(async () => mockResult);
      
      //Act
      const visits = await visitController.getVisits(mockRequest);

      //Assert
      expect(visits).toBe(mockResult);
    });
  });

  describe('bulkInsertVisits', () => {
    it('should return an array of vists', async () => {
        const decodedJwt = { "custom:organization_id": "123" };
      (decodeJwt as jest.Mock).mockReturnValue(decodedJwt);
      const date = new Date();
      const mockRequest: Request = {
        headers:{
            authorization:"Bearer test"
        },
        params: {
        },
        body: [
                {
                  time: date,
                  url:"https://llm.com"
                },
                {
                  time: date,
                  url:"https://ofir.com"
                },
             ],
        query: {},
      } as any; 

        const expectedResult:BulkResult<PostVisitRequestDto> = {
            status:"partial success",
            successes:[
              {
                time: date,
                url:"https://llm.com"
              },
            ],
            failures:[
              {
                time: date,
                url:"https://ofir.com"
              },
            ]
        }
      jest.spyOn(visitRepository, 'bulkInsertVisits').mockImplementation(async () => {});
      const bulkResult = await visitController.bulkInsertVisits(mockRequest);

      // Assertions
      expect(bulkResult).toEqual(expectedResult);  // Check the entire result
      expect(bulkResult.status).toBe(expectedResult.status);  // Check the status

      // Check successes array
      expect(bulkResult.successes).toHaveLength(expectedResult.successes.length);  
      expect(bulkResult.successes[0].url).toBe(expectedResult.successes[0].url);

      // Check failures array
      expect(bulkResult.failures).toHaveLength(expectedResult.failures.length);  
      expect(bulkResult.failures[0].url).toBe(expectedResult.failures[0].url);  
    });
  });
});