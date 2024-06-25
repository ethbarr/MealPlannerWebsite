import { TestBed } from '@angular/core/testing';

import { DragDropConnectionsService } from './drag-drop-connections.service';

describe('DragDropConnectionsService', () => {
  let service: DragDropConnectionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DragDropConnectionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
