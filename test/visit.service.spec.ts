import { VisitService } from 'src/services/visit.service';
import { MongoVisitRepository } from 'src/repositories/mongo.visit.repository';
import { MongoDbRepository } from 'src/repositories/mongo.db.repository';
import { BulkResult, BulkVisitRequestDto, GetVisitRequestDto, GetVisitResponseDto, PaginatedResult, PostVisitRequestDto } from 'src/contracts/dtos';
import { Test } from '@nestjs/testing';
import { IDbRepository } from 'src/repositories/db.repository.interface';
import { IVisitRepository } from 'src/repositories/visit.repository.interface';
import { IVisitService } from 'src/services/visit.service.interface';
import { MongoClient } from 'mongodb';

describe('VisitService', () => {
  let visitService: IVisitService;
  let visitRepository: IVisitRepository;
  let mongoDb: IDbRepository<MongoClient>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
        controllers: [],
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
  });

  describe('getVisits', () => {
    it('should return a PaginatedResult with data of GetVisitResponseDto', async () => {
      //Arrange
      const request: GetVisitRequestDto = {
          organization_id:"123",
          limit:1,
          offset:5
      }
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
      const visits = await visitService.getVisits(request);

      //Assert
      expect(visits).toBe(mockResult);
    });
  });

  describe('bulkInsertVisits', () => {
    it('should return an array of vists', async () => {
      //Arrange
        const request: BulkVisitRequestDto = {
           organization_id:"123",
           visits:[
              {
                time: new Date(),
                url:"llm.com"
              },
              {
                time: new Date(),
                url:"ofir.com"
              },
           ]
        }
        const expectedResult:BulkResult<PostVisitRequestDto> = {
            status:"partial success",
            successes:[
              {
                time: new Date(),
                url:"llm.com"
              },
            ],
            failures:[
              {
                time: new Date(),
                url:"ofir.com"
              },
            ]
        }
      jest.spyOn(visitRepository, 'bulkInsertVisits').mockImplementation(async () => {});

      //Act
      const bulkResult = await visitService.bulkInsertVisits(request);

      //Assert
      expect(bulkResult).toEqual(expectedResult);
      expect(bulkResult.status).toBe(expectedResult.status);

      expect(bulkResult.successes).toHaveLength(expectedResult.successes.length);  
      expect(bulkResult.successes[0].url).toBe(expectedResult.successes[0].url);

      expect(bulkResult.failures).toHaveLength(expectedResult.failures.length);  
      expect(bulkResult.failures[0].url).toBe(expectedResult.failures[0].url);  
    });
  });
});