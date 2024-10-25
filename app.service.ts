import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { GitHubService } from './github.service';

describe('GitHubService', () => {
  let service: GitHubService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ GitHubService ]
    });

    service = TestBed.inject(GitHubService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should retrieve repositories from the API via GET', () => {
    const mockRepos = [{ name: 'Repo1' }, { name: 'Repo2' }];
    const username = 'testuser';

    service.getRepos(username).subscribe(repos => {
      expect(repos).toEqual(mockRepos);
    });

    const req = httpMock.expectOne(`https://api.github.com/users/${username}/repos`);
    expect(req.request.method).toBe('GET');
    req.flush(mockRepos);
  });


  it('should handle error when API call fails', () => {
    const mockError = new ErrorEvent('Network error');
    const username = 'testuser';

    service.getRepos(username).subscribe({
      next: () => fail('expected an error, not repos'),
      error: error => expect(error.message).toContain('Error fetching data')
    });

    const req = httpMock.expectOne(`https://api.github.com/users/${username}/repos`);
    req.error(mockError);
  });
});