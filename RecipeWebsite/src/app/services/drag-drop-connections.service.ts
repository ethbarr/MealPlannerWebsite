import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DragDropConnectionsService {
  private connections: Set<string> = new Set();

  addConnection(id: string): void {
    this.connections.add(id);
  }

  removeConnection(id: string): void {
    this.connections.delete(id);
  }

  getConnections(): string[] {
    return Array.from(this.connections);
  }
}

