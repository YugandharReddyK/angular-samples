import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  avatar: string;
}

@Component({
  selector: 'app-users',
  imports: [RouterLink],
  templateUrl: './users.html',
  styleUrl: './users.scss',
})
export class UsersComponent {
  users: User[] = [
    { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin', avatar: '👩‍💼' },
    { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'Developer', avatar: '👨‍💻' },
    { id: 3, name: 'Carol Williams', email: 'carol@example.com', role: 'Designer', avatar: '👩‍🎨' },
    { id: 4, name: 'David Brown', email: 'david@example.com', role: 'Manager', avatar: '👨‍💼' },
    { id: 5, name: 'Eve Davis', email: 'eve@example.com', role: 'Developer', avatar: '👩‍💻' }
  ];
}
