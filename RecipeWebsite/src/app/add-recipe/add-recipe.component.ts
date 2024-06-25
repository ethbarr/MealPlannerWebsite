import { Component, OnInit, ViewChildren, ViewChild, ElementRef, QueryList, AfterViewInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { RecipeService } from '../services/recipe-service.service'; 

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css']
})
export class AddRecipeComponent implements OnInit, AfterViewInit {
  recipeForm: FormGroup;
  newIngredientControl = new FormControl('', Validators.required);
  newInstructionControl = new FormControl('', Validators.required);

  @ViewChildren('ingredientInput') ingredientInputs!: QueryList<ElementRef>;
  @ViewChildren('instructionInput') instructionInputs!: QueryList<ElementRef>;
  @ViewChild('newIngredientInput') newIngredientInput!: ElementRef;
  @ViewChild('newInstructionInput') newInstructionInput!: ElementRef;

  constructor(private fb: FormBuilder, private recipeService: RecipeService, private renderer: Renderer2) {
    this.recipeForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
      ingredients: this.fb.array([]),
      instructions: this.fb.array([]),
      thumbnail: [''],
      isActive: [true]
    });
  }

  ngOnInit(): void { }

  ngAfterViewInit(): void { }

  private focusElement(element: ElementRef): void {
    setTimeout(() => {
      this.renderer.selectRootElement(element.nativeElement).focus();
    }, 0);
  }

  get ingredients() {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  get instructions() {
    return this.recipeForm.get('instructions') as FormArray;
  }

  addIngredient() {
    if (this.newIngredientControl.valid) {
      this.ingredients.push(this.fb.group({
        ingredient: this.newIngredientControl.value
      }));
      this.newIngredientControl.reset();
      this.focusElement(this.newIngredientInput);
    }
  }

  addInstruction() {
    if (this.newInstructionControl.valid) {
      this.instructions.push(this.fb.group({
        instruction: this.newInstructionControl.value
      }));
      this.newInstructionControl.reset();
      this.focusElement(this.newInstructionInput);
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.recipeForm.patchValue({ thumbnail: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    if (this.recipeForm.valid) {
      const newRecipe = {
        id: this.generateGUID(),
        ...this.recipeForm.value,
        ingredients: this.ingredients.value.map((item: { ingredient: string }) => item.ingredient.trim()),
        instructions: this.instructions.value.map((item: { instruction: string }) => item.instruction.trim()),
        thumbnail: this.recipeForm.value.thumbnail // assuming thumbnail is being handled correctly elsewhere
      };
      this.recipeService.addRecipe(newRecipe).subscribe({
        next: (response) => {
          this.recipeForm.reset();
        },
        error: (error) => {
          console.error('Error adding recipe:', error);
        }
      });
    }
  }

  private generateGUID(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = (Math.random() * 16) | 0,
        v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }
}



