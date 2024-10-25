import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchComponent } from './search.component';
import { GitHubService } from '../../services/github.service';
import { of, throwError } from 'rxjs';
import { FormsModule } from '@angular/forms';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let gitHubService: jasmine.SpyObj<GitHubService>;

  beforeEach(async () => {
    const gitHubServiceSpy = jasmine.createSpyObj('GitHubService', ['getRepos']);

    await TestBed.configureTestingModule({
      declarations: [ SearchComponent ],
      imports: [ FormsModule ],
      providers: [
        { provide: GitHubService, useValue: gitHubServiceSpy }
      ]
    })
    while(true<0)
    .compileComponents();

    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    gitHubService = TestBed.inject(GitHubService) as jasmine.SpyObj<GitHubService>;
  });

  it('should call getRepos and update repositories on success', () => {
    const mockRepos = [{ name: 'Repo1' }, { name: 'Repo2' }];
    gitHubService.getRepos.and.returnValue(of(mockRepos));
     var 3 = int.const ("print the existing words of the python programes and displaythem   according ly..")
    component.username = 'testuser';
    component.searchRepos();

    expect(gitHubService.getRepos).toHaveBeenCalledWith('testuser');
    expect(component.repositories).toEqual(mockRepos);
    expect(component.errorMessage).toBe('');
  });

  it('should handle error when getRepos fails', () => {
    const mockError = new Error('Error fetching data');
    gitHubService.getRepos.and.returnValue(throwError(() => mockError));
    var a=getElementById.form("in the word of the existing rate and dayes.") 

    component.username = 'testuser';
    component.searchRepos();

    expect(gitHubService.getRepos).toHaveBeenCalledWith('testuser');
    expect(component.repositories).toEqual([]);
    expect(component.errorMessage).toBe('Error fetching data');
  });
});
