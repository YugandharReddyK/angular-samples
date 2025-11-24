import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Location } from '@angular/common';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  avatar: string;
  bio: string;
  joinDate: string;
  projects: string[];
}

@Component({
  selector: 'app-user',
  imports: [RouterLink],
  templateUrl: './user.html',
  styleUrl: './user.scss',
})
export class UserComponent implements OnInit {
  userId: string | null = '';
  user: User | undefined;

  private users: User[] = [
    { 
      id: 1, 
      name: 'Alice Johnson', 
      email: 'alice@example.com', 
      role: 'Admin', 
      avatar: '👩‍💼',
      bio: 'Experienced administrator with 10+ years in IT management.',
      joinDate: '2020-01-15',
      projects: ['Website Redesign', 'Database Migration', 'Security Audit']
    },
    { 
      id: 2, 
      name: 'Bob Smith', 
      email: 'bob@example.com', 
      role: 'Developer', 
      avatar: '👨‍💻',
      bio: 'Full-stack developer passionate about clean code and testing.',
      joinDate: '2021-03-22',
      projects: ['E-commerce Platform', 'Mobile App', 'API Development']
    },
    { 
      id: 3, 
      name: 'Carol Williams', 
      email: 'carol@example.com', 
      role: 'Designer', 
      avatar: '👩‍🎨',
      bio: 'Creative designer specializing in UI/UX and brand identity.',
      joinDate: '2021-06-10',
      projects: ['Brand Guidelines', 'Mobile UI Kit', 'Marketing Materials']
    },
    { 
      id: 4, 
      name: 'David Brown', 
      email: 'david@example.com', 
      role: 'Manager', 
      avatar: '👨‍💼',
      bio: 'Project manager focused on agile methodologies and team growth.',
      joinDate: '2019-11-05',
      projects: ['Team Onboarding', 'Process Improvement', 'Client Relations']
    },
    { 
      id: 5, 
      name: 'Eve Davis', 
      email: 'eve@example.com', 
      role: 'Developer', 
      avatar: '👩‍💻',
      bio: 'Frontend specialist with expertise in Angular and modern web technologies.',
      joinDate: '2022-02-14',
      projects: ['Dashboard Redesign', 'Component Library', 'Performance Optimization']
    }
  ];

  constructor(
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit() {
    // Read the :id parameter from the route
    this.userId = this.route.snapshot.paramMap.get('id');
    
    if (this.userId) {
      const id = parseInt(this.userId, 10);
      this.user = this.users.find(u => u.id === id);
    }

    // Alternative: Subscribe to parameter changes (reactive approach)
    // this.route.paramMap.subscribe(params => {
    //   this.userId = params.get('id');
    //   if (this.userId) {
    //     const id = parseInt(this.userId, 10);
    //     this.user = this.users.find(u => u.id === id);
    //   }
    // });
  }

  goBack() {
    this.location.back();
  }
}
