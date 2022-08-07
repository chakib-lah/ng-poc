<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\DateFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\OrderFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\RangeFilter;
use App\Repository\MovieRepository;
use DateTime;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\Serializer\Annotation\Groups;
use Vich\UploaderBundle\Mapping\Annotation as Vich;

#[ORM\Entity(repositoryClass: MovieRepository::class)]
#[ApiResource(
    collectionOperations: [
        'get',
        'post' => [
            'input_formats' => [
                'multipart' => ['multipart/form-data'],
            ],
        ],
    ],
    denormalizationContext: ['groups' => ['movie:write']],
    normalizationContext: ['groups' => ['movie:read']],
)]
#[ApiFilter(OrderFilter::class, properties: ['dateRelease' => 'DESC'])]
#[ApiFilter(DateFilter::class, properties: ['dateRelease'])]
#[ApiFilter(RangeFilter::class, properties: ['score'])]
class Movie
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private $id;

    #[ORM\Column(type: 'string', length: 100, nullable: true)]
    #[Groups(['movie:write', 'movie:read'])]
    private $title;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    #[Groups(['movie:write', 'movie:read'])]
    private $description;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    #[Groups(['movie:write', 'movie:read'])]
    private $cover;

    /**
     * @Vich\UploadableField(mapping="media_object", fileNameProperty="filePath")
     */
    #[Groups(['movie:write'])]
    public ?File $file = null;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    private $photos;

    #[ORM\Column(type: 'integer', nullable: true)]
    #[Groups(['movie:write', 'movie:read'])]
    private $score;

    #[ORM\Column(type: 'string', length: 100, nullable: true)]
    #[Groups(['movie:write', 'movie:read'])]
    private $country;

    #[ORM\Column(type: 'date', nullable: true)]
    #[Groups(['movie:write', 'movie:read'])]
    private $dateRelease;

    #[ORM\ManyToMany(targetEntity: Actors::class, mappedBy: "movies")]
    #[Groups(['movie:write', 'movie:read'])]
    private $actors;

    #[ORM\ManyToMany(targetEntity: Categories::class, mappedBy: "categories")]
    #[Groups(['movie:write', 'movie:read'])]
    private $categories;

    #[ORM\ManyToOne(targetEntity: Authors::class, inversedBy: "movies")]
    #[Groups(['movie:write', 'movie:read'])]
    private $authors;

    #[ORM\OneToMany(mappedBy: "movies", targetEntity: Comment::class, orphanRemoval: true)]
    #[Groups(['movie:write', 'movie:read'])]
    private $comments;

    public function __construct()
    {
        $this->actors = new ArrayCollection();
        $this->categories = new ArrayCollection();
        $this->comments = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    /**
     * @return string|null
     */
    public function getTitle(): ?string
    {
        return $this->title;
    }

    /**
     * @param string|null $title
     * @return $this
     */
    public function setTitle(?string $title): self
    {
        $this->title = $title;

        return $this;
    }

    /**
     * @return string|null
     */
    public function getDescription(): ?string
    {
        return $this->description;
    }

    /**
     * @param string|null $description
     * @return Movie
     */
    public function setDescription(?string $description): self
    {
        $this->description = $description;

        return $this;
    }

    /**
     * @return string|null
     */
    public function getCover(): ?string
    {
        return $this->cover;
    }

    /**
     * @param string|null $cover
     * @return Movie
     */
    public function setCover(?string $cover): self
    {
        $this->cover = $cover;

        return $this;
    }

    /**
     * @return string|null
     */
    public function getPhotos(): ?string
    {
        return $this->photos;
    }

    /**
     * @param string|null $photos
     * @return Movie
     */
    public function setPhotos(?string $photos): self
    {
        $this->photos = $photos;

        return $this;
    }

    /**
     * @return int|null
     */
    public function getScore(): ?int
    {
        return $this->score;
    }

    /**
     * @param int|null $score
     * @return Movie
     */
    public function setScore(?int $score): self
    {
        $this->score = $score;

        return $this;
    }


    /**
     * @return string|null
     */
    public function getCountry(): ?string
    {
        return $this->country;
    }

    /**
     * @param string $country
     * @return Movie
     */
    public function setCountry(string $country): self
    {
        $this->country = $country;

        return $this;
    }

    /**
     * @return DateTime
     */
    public function getDateRelease(): DateTime
    {
        return $this->dateRelease;
    }

    /**
     * @param DateTime $dateRelease
     * @return Movie
     */
    public function setDateRelease(DateTime $dateRelease): self
    {
        $this->dateRelease = $dateRelease;

        return $this;
    }

    /**
     * @return Collection|Actors[]
     */
    public function getActors(): Collection
    {
        return $this->actors;
    }

    public function addActor(Actors $actor): self
    {
        if (!$this->actors->contains($actor)) {
            $this->actors[] = $actor;
        }
        return $this;
    }

    public function removeActor(Actors $actor): self
    {
        $this->actors->removeElement($actor);

        return $this;
    }

    /**
     * @return Collection|Actors[]
     */
    public function getCategories(): Collection
    {
        return $this->categories;
    }

    public function addCategorie(Categories $categories): self
    {
        if (!$this->categories->contains($categories)) {
            $this->categories[] = $categories;
        }
        return $this;
    }

    public function removeCategorie(Categories $categories): self
    {
        $this->categories->removeElement($categories);

        return $this;
    }

    /**
     * @return Authors|null
     */
    public function getAuthors(): ?Authors
    {
        return $this->authors;
    }

    /**
     * @param Authors|null $authors
     * @return Movie
     */
    public function setAuthors(?Authors $authors): self
    {
        $this->authors = $authors;
        return $this;
    }

    /**
     * @return Collection|Comment[]
     */
    public function getComments(): Collection
    {
        return $this->comments;
    }

    /**
     * @param Comment $comments
     * @return $this
     */
    public function addComment(Comment $comments): self
    {
        if (!$this->comments->contains($comments)) {
            $this->comments[] = $comments;
            $comments->setMovies($this);
        }

        return $this;
    }

    public function removeComment(Comment $comments): self
    {
        if ($this->comments->contains($comments)) {
            $this->comments->removeElement($comments);
            if ($comments->getMovies() === $this) {
                $comments->setMovies(null);
            }
        }

        return $this;
    }


}
