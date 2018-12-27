import { Component, OnInit } from '@angular/core';
import { TeamService } from '../services/team.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
  providers: [TeamService]
})
export class LandingPageComponent implements OnInit {
  list: any[];
  closeResult: string;
  memberForm: FormGroup;
  member: any = {
    name: '',
    lastName: '',
    rol: '',
    gender: ''
  };

  constructor(
    private teamService: TeamService,
    private modalService: NgbModal,
  ) { }

  ngOnInit() {
    this.createForm();
    this.teamService.getTeamMembers()
      .subscribe(
        (res) => {
          this.list = res;
        }
      );
  }

  createForm() {
    this.memberForm = new FormGroup({
      name: new FormControl(this.member.name, [
        Validators.required,
        Validators.minLength(4)
      ]),
      lastName: new FormControl(this.member.lastName, [
        Validators.required,
        Validators.minLength(4)
      ]),
      rol: new FormControl(this.member.rol, [
        Validators.required,
        Validators.minLength(4)
      ]),
      gender: new FormControl(this.member.gender, [
        Validators.required,
        Validators.minLength(4)
      ]),
    });
  }

  addMember(param) {
    if (param) {
      this.teamService.addTeamMember(param)
      .subscribe(
        (res) => {
          this.list.push(res);
          this.createForm();
        }
      );
    } else {
      return of([]);
    }
  }

  editMember(param) {
    this.teamService.editTeamMember(param)
      .subscribe(
        (res) => {
          this.list[res.index - 1] = res;
        }
      );
  }

  editMemberModal(param, content) {
    this.member = param;
    this.createForm();
    this.open(content, true);
  }

  open(content, isModify) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      if (isModify) {
        this.editMember(this.member);
      } else {
        this.addMember(this.memberForm.value);
      }
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

}
