import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Recipe } from '../models/recipe.model';
import { MealType } from '../models/meal-type.model';
import { Day } from '../models/day.model';
import { DragDropConnectionsService } from '../services/drag-drop-connections.service';
import { CalendarService } from '../services/calendar.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  @ViewChild('daysContainer') daysContainer!: ElementRef;

  mealTypes: MealType[] = ['breakfast', 'lunch', 'dinner', 'snack'];

  week: Day[] = [
    {
      name: 'Monday',
      meals: { breakfast: [], lunch: [], dinner: [], snack: [] }
    },
    {
      name: 'Tuesday',
      meals: { breakfast: [], lunch: [], dinner: [], snack: [] }
    },
{
      name: 'Wednesday',
      meals: { breakfast: [], lunch: [], dinner: [], snack: [] }
    },
    {
      name: 'Thursday',
      meals: { breakfast: [], lunch: [], dinner: [], snack: [] }
    },
    {
      name: 'Friday',
      meals: { breakfast: [], lunch: [], dinner: [], snack: [] }
    },
    {
      name: 'Saturday',
      meals: { breakfast: [], lunch: [], dinner: [], snack: [] }
    },
    {
      name: 'Sunday',
      meals: { breakfast: [], lunch: [], dinner: [], snack: [] }
    }

  ];

  constructor(private dragDropConnectionsService: DragDropConnectionsService,
    private calendarService: CalendarService) { }

  ngOnInit(): void {
    this.mealTypes.forEach(mealType => {
      this.week.forEach(day => {
        const id = `${day.name}-${mealType}`;
        this.dragDropConnectionsService.addConnection(id);
      });
    });   
  }

  ngOnDestroy(): void {
    // Example of removing connections
    // Similar loop to addConnection, but call removeConnection instead
  }

  drop(event: CdkDragDrop<Recipe[], any>): void {
    if (event.previousContainer === event.container) {
      // Handle reordering within the same container
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      // Handle dropping into a different container
      // Extract the dropped recipe
      const recipe = event.previousContainer.data[event.previousIndex];

      // Add the recipe to the calendar using the service
      this.calendarService.addRecipeToCalendar(recipe);

      // Determine the target day and meal type based on the drop container's ID
      const [targetDayName, targetMealType] = event.container.id.split('-');
      const targetDay = this.week.find(day => day.name === targetDayName);

      if (targetDay) {
        // Use type assertion to assure TypeScript about the dynamic key access
        const targetMealTypeKey = targetMealType as keyof typeof targetDay.meals;

        if (targetDay.meals[targetMealTypeKey]) {
          // Add the recipe to the targeted meal slot
          targetDay.meals[targetMealTypeKey].push(recipe);

          // Optionally, remove the recipe from the original container if it should no longer be available for dragging
          // event.previousContainer.data.splice(event.previousIndex, 1);
        }
      }
    }
  }

  handleDragStart(event: DragEvent) {
    const targetElement = event.target as HTMLElement;
    if (targetElement && event.dataTransfer) {
      event.dataTransfer.setData('text/plain', targetElement.id);
    }
  }

  allowDrop(event: DragEvent) {
    // Prevent default behavior to allow dropping
    event.preventDefault();
  }

  //handleDrop(event: DragEvent, mealType: string, dayIndex: number) {
  //  // Handle dropped recipe data (e.g., add to meal plan)
  //  const recipeId = event.dataTransfer?.getData('text/plain');
  //  // Add logic to update your meal plan
  //  console.log(`Recipe dropped: ${recipeId}`);
  //}

  getConnectedDropListIds(): string[] {
    let ids: string[] = [];
    this.week.forEach(day => {
      this.mealTypes.forEach(mealType => {
        // Construct an ID for each meal slot by combining the day name and meal type
        ids.push(`${day.name}-${mealType}`);
      });
    });
    return ids;
  }

  scrollLeft(): void {
    this.daysContainer.nativeElement.scrollBy({
      left: -this.daysContainer.nativeElement.offsetWidth,
      behavior: 'smooth'
    });
  }

  scrollRight(): void {
    this.daysContainer.nativeElement.scrollBy({
      left: this.daysContainer.nativeElement.offsetWidth,
      behavior: 'smooth'
    });
  }

}
