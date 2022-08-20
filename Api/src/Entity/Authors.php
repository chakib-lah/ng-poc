<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\AuthorsRepository;
use DateTime;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\Serializer\Annotation\Groups;
use Vich\UploaderBundle\Mapping\Annotation as Vich;


/**
 * @Vich\Uploadable()
 */
#[ORM\Entity(repositoryClass: AuthorsRepository::class)]
#[ApiResource(
    collectionOperations: [
        'get',
        'post' => [
            'input_formats' => [
                'multipart' => ['multipart/form-data'],
            ],
        ],
    ],
    denormalizationContext: ['groups' => ['authors:write']],
    normalizationContext: ['groups' => ['authors:read']],
)]
class Authors
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private $id;

    #[ORM\Column(type: 'string', length: 60)]
    #[Groups(['authors:write', 'authors:read'])]
    private $firstName;

    #[ORM\Column(type: 'string', length: 60)]
    #[Groups(['authors:write', 'authors:read'])]
    private $lastName;

    #[ORM\Column(type: 'date')]
    #[Groups(['authors:write', 'authors:read'])]
    private $birthDate;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    #[Groups(['authors:write', 'authors:read'])]
    private $filmography;

    /**
     * @Vich\UploadableField(mapping="authors", fileNameProperty="photo")
     */
    #[Groups(['authors:write'])]
    public ?File $photoFile = null;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    #[Groups(['authors:read'])]
    private $photo;

    #[ORM\OneToMany(mappedBy: "authors", targetEntity: Movie::class, orphanRemoval: true)]
    #[Groups(['authors:read'])]
    private $movies;

    public function __construct()
    {
        $this->movies = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getFirstName(): ?string
    {
        return $this->firstName;
    }

    public function setFirstName(string $firstName): self
    {
        $this->firstName = $firstName;

        return $this;
    }

    public function getLastName(): ?string
    {
        return $this->lastName;
    }

    public function setLastName(string $lastName): self
    {
        $this->lastName = $lastName;

        return $this;
    }

    /**
     * @return DateTime|null
     */
    public function getBirthDate(): ?DateTime
    {
        return $this->birthDate;
    }

    /**
     * @param DateTime $birthDate
     * @return Authors
     */
    public function setBirthDate(DateTime $birthDate): self
    {
        $this->birthDate = $birthDate;

        return $this;
    }

    /**
     * @return string|null
     */
    public function getFilmography(): ?string
    {
        return $this->filmography;
    }

    /**
     * @param string $filmography
     * @return Authors
     */
    public function setFilmography(string $filmography): self
    {
        $this->filmography = $filmography;

        return $this;
    }

    /**
     * @return string|null
     */
    public function getPhoto(): ?string
    {
        return $this->photo;
    }

    /**
     * @param string $photo
     * @return Authors
     */
    public function setPhoto(string $photo): self
    {
        $this->photo = $photo;

        return $this;
    }


    /**
     * @return Collection|Movie[]
     */
    public function getMovies(): Collection
    {
        return $this->movies;
    }

    /**
     * @param Movie $movie
     * @return $this
     */
    public function addMovie(Movie $movie): self
    {
        if (!$this->movies->contains($movie)) {
            $this->movies[] = $movie;
            $movie->setAuthors($this);
        }

        return $this;
    }

    public function removeMovie(Movie $movie): self
    {
        if ($this->movies->contains($movie)) {
            $this->movies->removeElement($movie);
            if ($movie->getAuthors() === $this) {
                $movie->setAuthors(null);
            }
        }

        return $this;
    }


}
