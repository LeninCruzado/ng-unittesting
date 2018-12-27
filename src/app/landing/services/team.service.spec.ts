import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { TeamService } from './team.service';
import { HttpClientModule } from '@angular/common/http';
import { asyncData } from 'src/testing/async-observable-helpers';
import { of, Observable } from 'rxjs';

describe('TeamService', () => {
  let httpClientSpy: { get: jasmine.Spy };
  let httpTestingController: HttpTestingController;
  let teamService: TeamService;
  let spy: any;
  // let response: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [TeamService]
    });

    // httpTestingController = TestBed.get(HttpTestingController);
  });

  beforeEach(() => {
    // TODO: spy on other methods too
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    teamService = new TeamService(<any> httpClientSpy);
  });

  it('should be created', () => {
    const service: TeamService = TestBed.get(TeamService);
    expect(service).toBeTruthy();
  });

  it('should return expected members (HttpClient called once)', () => {
    const expectedMembers: any[] =
      [{
        id: 1,
        name: 'Rodolfo Lenin',
        lastName: 'Cruzado Cirilo',
        rol: 'Front-End',
        gender: 'male'
      },
      {
        id: 6,
        name: 'John Franklin',
        lastName: 'Chavez Matias',
        rol: 'Back-End',
        gender: 'male'
      }];

    httpClientSpy.get.and.returnValue(asyncData(expectedMembers));

    teamService.getTeamMembers().subscribe(
      members => expect(members).toEqual(expectedMembers, 'expected members'),
      fail
    );
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });

  it('should be create a new member', () => {
    const data = {
      name: 'Rodolfo Lenin',
      lastName: 'xxxx xxxx',
      rol: 'Front-End',
      gender: 'male'
    };
    /* spy = spyOn(teamService, 'addTeamMember');
    spy.and.returnValue(of(data));
    teamService.addTeamMember(data).subscribe(
      (res) => {
        expect(res).toEqual(jasmine.any(Object));
        expect(res.name).toBe('Rodolfo Lenin');
      }
    ); */
    /* teamService.addTeamMember({ id: 1 })
      .subscribe(res => {
        expect(res.name).toEqual('Rodolfo Lenin');
      });

    const req = httpTestingController.expectOne('http://localhost:8089/topics/1/courses');

    expect(req.request.method).toEqual('POST');

    req.flush(data); */
  });

  it('should be return null on create', () => {
    spy = spyOn(teamService, 'addTeamMember');
    spy.and.callThrough();
    spy.and.returnValue(null);
    const el = teamService.addTeamMember(null);
    console.log(el, 'asd null');
    expect(el).toBeNull();
  });

  it('should be edit a member', () => {
    const data = {
      name: 'Rodolfo Leni',
      lastName: 'Cruzado Cirilo',
      rol: 'Front-End',
      gender: 'male'
    };
    spy = spyOn(teamService, 'editTeamMember').and.returnValue(data);
    const el = teamService.editTeamMember(data);
    console.log(el);
    expect(teamService.editTeamMember).toHaveBeenCalled();
  });

  it('should be return null on edit', () => {
    spy = spyOn(teamService, 'editTeamMember').and.returnValue(null);
    const el = teamService.editTeamMember(null);
    console.log(el);
    expect(el).toBeNull();
  });
});
