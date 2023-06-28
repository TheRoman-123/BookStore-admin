import {Component, OnInit} from '@angular/core';
import {NzModalService} from 'ng-zorro-antd/modal';
import {AuthorService} from "../author.service";

export interface AuthorData {
  id: number;
  authorName: string;
}

@Component({
  selector: 'app-author-table',
  templateUrl: './author-table.component.html',
  styleUrls: ['./author-table.component.css']
})
export class AuthorTableComponent implements OnInit {

  editId: number | null = null;
  listOfData: AuthorData[] = [];

  showAuthorModal: boolean = false;

  constructor(
    private modalService: NzModalService,
    private authorService: AuthorService,
  ) {
  }

  ngOnInit(): void {
    this.authorService.getAuthors()
      .subscribe(
        {
          next:
            (value: AuthorData[]) => {
              this.listOfData = value;
              console.log(this.listOfData);
            },
          error:
            () => {
              alert("Authors can't be received")
            }
        }
      )
  }

  startEdit(id: number): void {
    this.editId = id;
  }

  stopEdit(author: AuthorData): void {
    this.authorService.updateAuthor(author)
      .subscribe(
        {
          next:
            () => {
              alert("Author changed")
            },
          error:
            () => {
              alert("Author has not been changed")
            }
        }
      );
    this.editId = null;
  }

  showCreateAuthorModal() {
    this.showAuthorModal = true;
  }

  deleteRow(id: number): void {
    this.authorService.deleteAuthor(id)
      .subscribe(
        {
          next: () => {
            alert(`Author with id=${id} has been removed`);
            this.listOfData = this.listOfData.filter(d => d.id !== id);
          },
          error: (err) => {
            alert(err);
          }
        }
      );
  }

  handleOk(authorName: string) {
    this.authorService.createAuthor(authorName)
      .subscribe(
        {
          next:
            (id: number) => {
              alert(`Author with id=${id} was created`);
              // this.listOfData.push({ id: id, authorName: authorName });
              this.listOfData = [...this.listOfData, { id: id, authorName: authorName }];
            },
          error:
            (err) => {
              alert(err);
            }
        }
      );
  }

  handleCancel() {
    this.showAuthorModal = false;
  }
}
