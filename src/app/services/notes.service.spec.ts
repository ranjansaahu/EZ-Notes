import { TestBed } from '@angular/core/testing';

import { NotesServiceService } from './notes.service';

describe('NotesServiceService', () => {
  let service: NotesServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotesServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
