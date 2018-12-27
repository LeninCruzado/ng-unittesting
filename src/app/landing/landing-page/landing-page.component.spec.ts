import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingPageComponent } from './landing-page.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TeamService } from '../services/team.service';
import { asyncData } from 'src/testing/async-observable-helpers';
import { of } from 'rxjs';

describe('LandingPageComponent', () => {
  let component: LandingPageComponent;
  let fixture: ComponentFixture<LandingPageComponent>;
  let httpClientSpy: { get: jasmine.Spy };
  let teamService: TeamService;
  let spy: any;

  const data = {
    name: 'Rodolfo Lenin',
    lastName: 'Cruzado Cirilo',
    rol: 'Front-End',
    gender: 'male'
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, FormsModule, ReactiveFormsModule],
      declarations: [ LandingPageComponent ],
      providers: [TeamService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    teamService = new TeamService(<any> httpClientSpy);
    spy = spyOn(teamService, 'addTeamMember').and.returnValue(data);
    console.log(spy, 'io');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call method addMember', () => {
    const el = component.addMember(null);
    expect(el).toBeTruthy();
    console.log(el);
  });

  xit('should add a Member', () => {
    fixture.detectChanges();

    // component.addMember(data);
    // expect(el).toHaveBeenCalled();
    // console.log(el, 'qwe');
    // teamService.addTeamMember(data);
    expect(spy.calls.any()).toBe(true, 'addTeamMember called');
  });
});
