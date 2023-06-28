import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-author-modal-add',
  templateUrl: 'author-modal-add.component.html',
  styleUrls: ['./author-modal-add.component.css']
})
export class AuthorModalAddComponent {
  @Output() addAuthor = new EventEmitter<string>();
  @Input() visible: boolean = false;
  authorForm: FormGroup;
  @ViewChild('addAuthorForm') addAuthorForm!: ElementRef;

  constructor(private fb: FormBuilder) {
    this.visible = true;
    this.authorForm = this.fb.group({
      authorName: ['', Validators.required]
    });
  }

  handleCancel(): void {
    this.visible = false;
  }

  handleSubmit(): void {
    if (this.authorForm.valid) {
      const authorName = this.authorForm.get('authorName')?.value;
      this.addAuthor.emit(authorName);
      this.visible = false;
      this.authorForm.reset();
    }
  }
}
